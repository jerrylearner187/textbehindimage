"use client";

import React, { useRef, useCallback, useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Progress } from "@/components/ui/progress";
import { BadgePlus, Files, FileText, Images, Link } from "lucide-react";
import { useFabric } from "@/hooks/use-fabric";
import { Toolbar } from "@/components/toolbar";
import ImageRender from "@/components/image-render";
import { ConfirmDialog } from "@/components/confirm-dialog"

import "@/app/fonts.css";
import AnimatedProgress from "@/components/animated-progrss";
import { EmptyState } from "@/components/empty-state";
import { useRouter } from "next/navigation";

const Editor: React.FC = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    isObjectSelected,
    handleImageUpload,
    canvasRef,
    isLoading,
    uploadProgress,
    currentMessage,
    canvasReady,
    addText,
    changeFontFamily,
    changeTextColor,
    flipImage,
    deleteSelectedObject,
    downloadCanvas,
    exitCanvas,
    selectedTextProperties,
    toggleFilter,
    isImageSelected,
    toggleDrawingMode,
    incrementBrushSize,
    setBrushColor,
    drawingSettings,
    addStroke,
    updateStrokeColor,
    updateStrokeWidth,
    strokeSettings,
    showStrokeUI,
    setShowDuplicateStroke,
    removeStroke,
    showDuplicateStroke,
  } = useFabric();
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const handleUploadImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        handleImageUpload(file);
      }
    },
    [handleImageUpload]
  );

  const handleExit = () => {
      exitCanvas();
      setShowConfirm(false);
      window.location.reload();
  }

  const exitEditor = () => {
    console.log('exitEditor');
    setShowConfirm(true);
  }

  return (
    <div className="flex flex-col">
      <div className="flex-grow flex items-center justify-center">
        <div
          className={`text-center m-6  ${!isLoading && !canvasReady ? "block" : "hidden"}`}
        >
          <EmptyState
            handleImageUpload={handleImageUpload}
            title="Welcome"
            description="Get started by uploading an image!"
            onFileChange={onFileChange}
            icons={[FileText, Images, Files]}
            action={{
              label: "Upload Image",
              onClick: () => {
                handleUploadImage;
              },
            }}
          />
        </div>
        {/* Upload button */}

        {/* Progress */}
        <div
          className={`${isLoading ? "flex" : "hidden"} flex-col items-center justify-center`}
        >
          <AnimatedProgress
            uploadProgress={uploadProgress}
            currentMessage={currentMessage}
          />
        </div>

        {/* Confirm */}
        <div
          className={`${showConfirm ? "flex" : "hidden"} flex-col items-center justify-center`}
        >
          <ConfirmDialog
            open={showConfirm}
            onOpenChange={setShowConfirm}
            title="Confirm"
            content="Please download your artwork before you exit"
            confirmText="Exit"
            onConfirm={handleExit}
            confirmVariant="destructive"
          />
        </div>

        {/* Canvas */}
        <div className={`w-full ${canvasReady ? "block" : "hidden"}`}>
          <ImageRender
            canvasRef={canvasRef}
            canvasReady={canvasReady}
            isObjectSelected={isObjectSelected}
          />
          <div className="absolute bottom-[calc(5rem)] left-0 right-0 w-full flex items-center justify-center">
            <Toolbar
              showDuplicateStroke={showDuplicateStroke}
              removeStroke={removeStroke}
              setShowDuplicateStroke={setShowDuplicateStroke}
              showStrokeUI={showStrokeUI}
              strokeSettings={strokeSettings}
              updateStrokeColor={updateStrokeColor}
              updateStrokeWidth={updateStrokeWidth}
              addStroke={addStroke}
              handleImageUpload={handleImageUpload}
              addText={addText}
              changeFontFamily={changeFontFamily}
              changeTextColor={changeTextColor}
              flipImage={flipImage}
              deleteSelectedObject={deleteSelectedObject}
              downloadCanvas={downloadCanvas}
              exitCanvas={exitEditor}
              selectedTextProperties={selectedTextProperties}
              toggleFilter={toggleFilter}
              isImageSelected={isImageSelected}
              toggleDrawingMode={toggleDrawingMode}
              drawingSettings={drawingSettings}
              incrementBrushSize={incrementBrushSize}
              setBrushColor={setBrushColor}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
