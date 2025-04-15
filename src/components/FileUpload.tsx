
import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { Upload, FilePlus, FileSpreadsheet, FileText, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

const FileUpload = ({ onFileUpload }: FileUploadProps) => {
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const allowedFileTypes = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/csv",
    "application/pdf"
  ];

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndUploadFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndUploadFile(e.target.files[0]);
    }
  };

  const validateAndUploadFile = (file: File) => {
    // For demo purposes, let's accept any file type with appropriate extension
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (!fileExtension || !['csv', 'xlsx', 'xls', 'pdf'].includes(fileExtension)) {
      toast.error("Please upload a CSV, Excel, or PDF file.", {
        description: "Only these file formats are supported."
      });
      return;
    }
    
    // Simulating file size check
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error("File is too large", {
        description: "Maximum file size is 5MB."
      });
      return;
    }
    
    onFileUpload(file);
    
    // Determine which type of test was uploaded based on filename
    const fileName = file.name.toLowerCase();
    let testType = "general";
    
    if (fileName.includes("diabetes")) {
      testType = "diabetes";
    } else if (fileName.includes("heart")) {
      testType = "heart";
    } else if (fileName.includes("cholesterol")) {
      testType = "cholesterol";
    } else if (fileName.includes("liver")) {
      testType = "liver";
    } else if (fileName.includes("kidney")) {
      testType = "kidney";
    }
    
    toast.success(`${testType.charAt(0).toUpperCase() + testType.slice(1)} test uploaded successfully`, {
      description: `Analyzing "${file.name}"...`
    });
  };

  const getFileIcon = () => {
    return (
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-medical-50 mb-4">
        <FilePlus className="h-8 w-8 text-medical-500" />
      </div>
    );
  };

  return (
    <div
      className={`file-upload-container border-2 border-dashed rounded-lg p-10 text-center transition-all ${
        dragging ? "border-medical-500 bg-medical-50" : "border-gray-300 hover:border-medical-300"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {getFileIcon()}
      <h3 className="text-lg font-medium mb-1">Upload Blood Test Report</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Drag and drop your file here, or click to browse
      </p>
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        <div className="flex items-center px-3 py-1 bg-medical-50 rounded-full text-xs">
          <FileSpreadsheet className="h-3 w-3 mr-1" />
          CSV
        </div>
        <div className="flex items-center px-3 py-1 bg-medical-50 rounded-full text-xs">
          <FileSpreadsheet className="h-3 w-3 mr-1" />
          Excel
        </div>
        <div className="flex items-center px-3 py-1 bg-medical-50 rounded-full text-xs">
          <FileText className="h-3 w-3 mr-1" />
          PDF
        </div>
      </div>
      
      <div className="bg-yellow-50 p-3 rounded-md mb-4 text-xs text-yellow-800 flex items-start">
        <Info className="h-4 w-4 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
        <p className="text-left">
          <span className="font-semibold block mb-1">Test Our Analysis With Special Filenames:</span>
          Include any of these keywords in your filename for different analysis results:
          <span className="flex flex-wrap gap-2 mt-1">
            <span className="inline-block px-2 py-0.5 bg-yellow-100 rounded text-yellow-800 font-medium">diabetes</span>
            <span className="inline-block px-2 py-0.5 bg-yellow-100 rounded text-yellow-800 font-medium">heart</span>
            <span className="inline-block px-2 py-0.5 bg-yellow-100 rounded text-yellow-800 font-medium">cholesterol</span>
            <span className="inline-block px-2 py-0.5 bg-yellow-100 rounded text-yellow-800 font-medium">liver</span>
            <span className="inline-block px-2 py-0.5 bg-yellow-100 rounded text-yellow-800 font-medium">kidney</span>
          </span>
        </p>
      </div>
      
      <Button
        variant="outline"
        onClick={() => fileInputRef.current?.click()}
        className="bg-white hover:bg-gray-50 w-full sm:w-auto"
      >
        <Upload className="h-4 w-4 mr-2 upload-icon" />
        Choose File
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".csv,.xlsx,.xls,.pdf"
        onChange={handleFileInputChange}
      />
    </div>
  );
};

export default FileUpload;
