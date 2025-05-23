
import React, { useState, useEffect } from "react";
import WorksheetDisplay from "@/components/WorksheetDisplay";
import { ArrowUp } from "lucide-react";
import { FormData } from "@/components/WorksheetForm";
import { useToast } from "@/hooks/use-toast";
import { submitFeedback, trackWorksheetEvent } from "@/services/worksheetService";

interface GenerationViewProps {
  worksheetId: string | null;
  generatedWorksheet: any;
  inputParams: FormData | null;
  generationTime: number;
  sourceCount: number;
  onBack: () => void;
  userId: string | null;
}

const GenerationView: React.FC<GenerationViewProps> = ({
  worksheetId,
  generatedWorksheet,
  inputParams,
  generationTime,
  sourceCount,
  onBack,
  userId
}) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (userId && worksheetId && generatedWorksheet) {
      // Only track events if we have a valid ID
      if (worksheetId.length > 10) {
        trackWorksheetEvent('view', worksheetId, userId);
      }
    }
  }, [userId, worksheetId, generatedWorksheet]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleFeedbackSubmit = async (rating: number, feedback: string) => {
    if (!userId) {
      toast({
        title: "Feedback submission error",
        description: "There was a problem with your session. Please refresh the page and try again.",
        variant: "destructive"
      });
      return;
    }

    try {
      await submitFeedback(worksheetId || 'unknown', rating, feedback, userId);
      
      toast({
        title: "Thank you for your feedback!",
        description: "Your rating and comments help us improve our service."
      });
    } catch (error) {
      console.error("Feedback submission error:", error);
      toast({
        title: "Feedback submission failed",
        description: "We couldn't submit your feedback. Please try again later.",
        variant: "destructive"
      });
    }
  };

  const handleDownloadEvent = () => {
    if (userId && worksheetId) {
      // Only track events if we have a valid ID
      if (worksheetId.length > 10) {
        trackWorksheetEvent('download', worksheetId, userId);
      }
    }
  };

  return (
    <>
      <WorksheetDisplay 
        worksheet={generatedWorksheet} 
        inputParams={inputParams} 
        generationTime={generationTime} 
        sourceCount={sourceCount} 
        onBack={onBack}
        worksheetId={worksheetId}
        wordBankOrder={generatedWorksheet?.exercises?.find((ex: any) => ex.type === "matching")?.shuffledTerms?.map((item: any) => item.definition)}
        onDownload={handleDownloadEvent}
        onFeedbackSubmit={handleFeedbackSubmit}
      />
      
      {showScrollTop && (
        <button 
          onClick={scrollToTop} 
          className="fixed bottom-6 right-6 z-50 bg-worksheet-purple text-white p-3 rounded-full shadow-lg hover:bg-worksheet-purpleDark transition-colors" 
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </>
  );
};

export default GenerationView;
