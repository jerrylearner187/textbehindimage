import React, { useCallback, useEffect, useRef, useState } from "react"
import { Canvas, FabricImage, PencilBrush } from "fabric"
import * as fabric from "fabric"
import { useWindow } from "@/hooks/use-window"
import { filterNames, getFilter } from "@/lib/constants"
import { removeBackground } from "@imgly/background-removal";
import { useToast } from "@/hooks/use-toast";

const CANVAS_DIMENSIONS = { default: 500, mobileMultiplier: 0.9 }
const DEFAULT_BACKGROUND_COLOR = "transparent"
const DEFAULT_FONT_COLOR = "#ffffff"
const DEFAULT_FONT_FAMILY = "Shrikhand"
const DEFAULT_TEXT_OPTIONS = {
  text: "edit",
  fontSize: 150,
  fontFamily: DEFAULT_FONT_FAMILY,
  fill: DEFAULT_FONT_COLOR,
  stroke: "black",
  strokeWidth: 1.5,
  textAlign: "center",
}

const loadingMessages = [
  { threshold: 5, message: "Initializing...", time: 0 },
  { threshold: 15, message: "Starting background removal...", time: 6000 },
  { threshold: 30, message: "Processing image...", time: 8000 },
  { threshold: 45, message: "Analyzing details...", time: 10000 },
  { threshold: 60, message: "Removing background...", time: 12000 },
  { threshold: 75, message: "Enhancing edges...", time: 19000 },
  { threshold: 85, message: "Almost done...", time: 21000 },
  { threshold: 95, message: "Finalizing...", time: 23000 }
];

interface TextStrokeSettings {
  id: string;
  hasStroke: boolean;
}


export interface DrawingPropertiesProps {
  isDrawing: boolean
  brushSize: number
  brushColor: string
}

export interface strokeSettingsProps {
  color: string | GradientColor;
  width: number;
  enabled: boolean;
}


interface StrokeSettings {
  color: ColorProps;
  width: number;
  enabled: boolean;
}

export interface GradientStop {
  offset: number;
  color: string;
}



export interface FabricGradient {
  type: 'linear';
  colorStops: GradientStop[];
  coords?: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  };
  gradientUnits?: string;
}

export interface CustomGradient {
  type: 'gradient';
  stops: GradientStop[];
  direction?: 'horizontal' | 'vertical';
}

interface GradientColor {
  type: 'gradient';
  stops: GradientStop[];
  direction: 'horizontal' | 'vertical';
}

export type GradientColors = FabricGradient | CustomGradient;

export type ColorProps = string | GradientColor;

export interface selectedTextPropertiesProps {
  fontFamily: string
  fontColor: ColorProps
  isTextSelected: boolean
}

function generateUniqueId(): string {
  return Math.random().toString(36).substr(2, 9);
}
interface ExtendedObject extends fabric.Object {
  customId?: string;
}


interface ExtendedTextbox extends fabric.Textbox {
  customId?: string;
}

interface TextPair {
  original: ExtendedTextbox;
  duplicate: ExtendedTextbox;
}
export function useFabric() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [canvas, setCanvas] = useState<Canvas | null>(null)
  const [currentBackgroundColor, setCurrentBackgroundColor] =
    React.useState<string>(DEFAULT_BACKGROUND_COLOR)
  const [selectedTextProperties, setSelectedTextProperties] =
    React.useState<selectedTextPropertiesProps>({
      fontFamily: DEFAULT_FONT_FAMILY,
      fontColor: DEFAULT_FONT_COLOR,
      isTextSelected: false,
    })
  const [textStrokeMap, setTextStrokeMap] = useState<Map<string, boolean>>(new Map());

  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(loadingMessages[0].message);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [removedBgLayer, setRemovedBgLayer] = React.useState<FabricImage | null>(null);
  const [canvasReady, setCanvasReady] = useState(false);
  const [isObjectSelected, setIsObjectSelected] = useState(false);

  const [isImageSelected, setIsImageSelected] = useState<boolean>(false)
  const [currentFilterIndex, setCurrentFilterIndex] = useState<number>(0)
  const { isMobile, windowSize } = useWindow()
  const [showStrokeUI, setShowStrokeUI] = useState(false);
  const [textPairs, setTextPairs] = useState<Map<string, TextPair>>(new Map());
  const [showDuplicateStroke, setShowDuplicateStroke] = useState(false);

  const [strokeSettings, setStrokeSettings] = useState<StrokeSettings>({
    color: '#000000',
    width: 1.5,
    enabled: false
  });

  const [drawingSettings, setDrawingSettings] =
    useState<DrawingPropertiesProps>({
      isDrawing: false,
      brushSize: 4,
      brushColor: "#ffffff",
    })

  useEffect(() => {
    if (!canvasRef.current) return

    const fabricCanvas = new Canvas(canvasRef.current, {
      width: 0,
      height: 0,
      backgroundColor: 'transparent',
      preserveObjectStacking: true,
      selection: true, // Enable selection
      interactive: true // Enable interaction


    })


    setCanvas(fabricCanvas)
    fabricCanvas.backgroundColor = currentBackgroundColor

    // Add a listener for when an object is added to the canvas
    fabricCanvas.on("object:added", (e) => {
      const object = e.target
      if (object) {
        object.set({
          cornerColor: "#FFF",
          cornerStyle: "rect",
          borderColor: "#3D78FF",
          cornerSize: 10,
          transparentCorners: false,
          borderOpacityWhenMoving: 0,
          cornerStrokeColor: "#3D78FF",
        })
        fabricCanvas.on('selection:created', () => {
          fabricCanvas.requestRenderAll()
        })

        fabricCanvas.on('object:modified', () => {
          fabricCanvas.requestRenderAll()
        })


        // TODO: MAKE IT MORE LIKE CANVA SELECTOR

        // Define custom controls
        object.controls = {
          ...object.controls,
          mtr: new fabric.Control({
            x: 0,
            y: -0.58,
            offsetY: -30,
            cursorStyle: "grab",
            actionName: "rotate",
            actionHandler: fabric.controlsUtils.rotationWithSnapping,
          }),
        }

        fabricCanvas.renderAll()
      }
    })

    // Add listeners for object selection and deselection
    const updateSelectedProperties = () => {
      const activeObject = fabricCanvas.getActiveObject()


      if (activeObject && activeObject.type === "textbox") {
        const text = activeObject as fabric.Textbox;
        const fill = text.get("fill");

        let fontColor: ColorProps;
        if (typeof fill === 'string') {
          fontColor = fill;
        } else if (fill instanceof fabric.Gradient) {
          fontColor = {
            type: 'gradient',
            stops: fill.colorStops.map(stop => ({ offset: stop.offset, color: stop.color })),
            direction: fill.coords.x2 === 1 ? 'horizontal' : 'vertical'
          };
        } else {
          fontColor = '#000000'; // Default color if fill is neither string nor gradient
        }

        setSelectedTextProperties({
          fontFamily: text.get("fontFamily") as string,
          fontColor: fontColor,
          isTextSelected: true,
        });
      } else {
        setSelectedTextProperties({
          fontFamily: DEFAULT_FONT_FAMILY,
          fontColor: DEFAULT_FONT_COLOR,
          isTextSelected: false,
        });
      }

      if (activeObject) {
        // console.log('Object selected');
        setIsObjectSelected(true);
        // console.log(isObjectSelected);
      }
      // Update image selection state
      if (activeObject && activeObject.type === "image") {
        setIsImageSelected(true)
      } else {
        setIsImageSelected(false)
      }
    }



    // Load the brush for drawing
    fabricCanvas.freeDrawingBrush = new PencilBrush(fabricCanvas)
    fabricCanvas.freeDrawingBrush.color = drawingSettings.brushColor
    fabricCanvas.freeDrawingBrush.width = drawingSettings.brushSize

    // Listen to multiple events that might change selection
    fabricCanvas.on("selection:created", updateSelectedProperties)
    fabricCanvas.on("selection:updated", updateSelectedProperties)
    fabricCanvas.on("selection:cleared", () => {
      updateSelectedProperties();
      setIsObjectSelected(false);

    });
    // Add a listener for object modifications
    fabricCanvas.on("object:modified", updateSelectedProperties)


    return () => {
      // Remove event listeners
      fabricCanvas.off("selection:created", updateSelectedProperties)
      fabricCanvas.off("selection:updated", updateSelectedProperties)
      fabricCanvas.off("selection:cleared", updateSelectedProperties)
      fabricCanvas.off("object:modified", updateSelectedProperties)
      fabricCanvas.dispose()
    }
  }, [])


  useEffect(() => {
    if (!canvas) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Delete" && canvas.getActiveObject()) {
        deleteSelectedObject()
      }
    }

    // Add event listener to the window
    window.addEventListener("keydown", handleKeyDown)

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [canvas, deleteSelectedObject])

  useEffect(() => {
    if (!canvas) return
    canvas.isDrawingMode = drawingSettings.isDrawing
    if (canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.color = drawingSettings.brushColor
      canvas.freeDrawingBrush.width = drawingSettings.brushSize
    }
    canvas.renderAll()
  }, [drawingSettings, canvas])


  useEffect(() => {
    if (!canvas) return;

    const handleObjectSelection = () => {
      const activeObject = canvas.getActiveObject();
      if (activeObject && activeObject.type === "textbox") {
        const text = activeObject as fabric.Textbox;
        const hasStroke = Boolean(text.stroke) && text.strokeWidth > 0;
        setShowStrokeUI(hasStroke);
      }
    };

    canvas.on('selection:created', handleObjectSelection);
    canvas.on('selection:updated', handleObjectSelection);
    canvas.on('selection:cleared', () => setShowStrokeUI(false));

    return () => {
      canvas.off('selection:created', handleObjectSelection);
      canvas.off('selection:updated', handleObjectSelection);
      canvas.off('selection:cleared');
    };
  }, [canvas]);




  function addText() {
    if (!canvas) return

    const text = new fabric.Textbox(DEFAULT_TEXT_OPTIONS.text, {
      ...DEFAULT_TEXT_OPTIONS,
      left: canvas.getWidth() / 2,
      top: canvas.getHeight() / 2,
      width: canvas.getWidth() * 0.1,
      originX: "center",
      originY: "center",
      selectable: true,
      evented: true,
      strokeWidth: 0,
      stroke: '',

      lockMovementX: false,
      lockMovementY: false,
      hasControls: true,
      hasBorders: true,
      padding: 4,
      splitByGrapheme: false,
      lockUniScaling: true, // Maintain aspect ratio when scaling
      centeredScaling: true,

    })


    text.on('scaling', () => {
      if (text.fill instanceof fabric.Gradient) {
        // Use identity matrix instead of null
        text.fill.gradientTransform = [1, 0, 0, 1, 0, 0];
        canvas?.requestRenderAll();
      }
    });

    // Add text first
    canvas.add(text)

    setShowDuplicateStroke(false); // Reset duplicate stroke state
    console.log('Show Duplicate Stroke:', showDuplicateStroke);
    canvas.setActiveObject(text)
    canvas.sendObjectToBack(text)

    canvas.renderAll()
  }


  function strokeUpward(originalText: ExtendedTextbox) {
    if (!canvas) return;


    const existingPair = Array.from(textPairs.values())
      .find(pair => pair.original.customId === originalText.customId);

    if (existingPair?.duplicate) {
      canvas.remove(existingPair.duplicate);
      const updatedPairs = new Map(textPairs);
      updatedPairs.delete(originalText.customId!);
      setTextPairs(updatedPairs);
    }


    const textId = generateUniqueId();
    originalText.customId = textId;

    let strokeValue: string | fabric.Pattern | fabric.Gradient<"linear">;
    if (typeof strokeSettings.color === 'string') {
      strokeValue = strokeSettings.color;
    } else {
      strokeValue = new fabric.Gradient<"linear">({
        type: 'linear',
        gradientUnits: 'percentage',
        coords: strokeSettings.color.direction === 'horizontal'
          ? { x1: 0, y1: 0, x2: 1, y2: 0 }
          : { x1: 0, y1: 0, x2: 0, y2: 1 },
        colorStops: strokeSettings.color.stops.map(stop => ({ ...stop, opacity: 1 }))
      });
    }

    if (showDuplicateStroke) {

      const duplicate = new fabric.Textbox(originalText.text, {
        left: originalText.left,
        top: originalText.top,
        width: originalText.width,
        height: originalText.height,
        fontSize: originalText.fontSize,
        fontFamily: originalText.fontFamily,
        textAlign: originalText.textAlign,
        originX: originalText.originX,
        originY: originalText.originY,
        fill: 'transparent',
        stroke: strokeValue,
        strokeWidth: strokeSettings.width || 1.5,
        selectable: false,
        evented: false,
        hasControls: false,
        hasBorders: true,
        padding: originalText.padding,
        splitByGrapheme: false,
        lockUniScaling: true,
        centeredScaling: true,
        angle: originalText.angle,
        scaleX: originalText.scaleX,
        scaleY: originalText.scaleY,
        visible: true // Ensure visibility


      }) as ExtendedTextbox;

      duplicate.customId = `${textId}-duplicate`;


      duplicate.customId = `${textId}-duplicate`;

      const updateDuplicate = () => {
        if (duplicate && canvas) {
          const currentStroke = duplicate.stroke;
          const currentStrokeWidth = duplicate.strokeWidth;


          duplicate.set({
            text: originalText.text,
            left: originalText.left,
            top: originalText.top,
            scaleX: originalText.scaleX,
            scaleY: originalText.scaleY,
            width: originalText.width,
            height: originalText.height,
            angle: originalText.angle,
            fontSize: originalText.fontSize,
            fontFamily: originalText.fontFamily,
            stroke: currentStroke, // Copy fill as stroke
            strokeWidth: currentStrokeWidth || 1.5,
            charSpacing: originalText.charSpacing,
            lineHeight: originalText.lineHeight,
            textAlign: originalText.textAlign,
            fill: 'transparent',
          });
          canvas.bringObjectToFront(duplicate);
          canvas.renderAll();
        }
      };


      // Event listeners
      originalText.on('moving', updateDuplicate);
      originalText.on('scaling', updateDuplicate);
      originalText.on('modified', updateDuplicate);
      originalText.on('changed', updateDuplicate);
      originalText.on('rotating', updateDuplicate);

      canvas.on('object:modified', (e) => {
        const target = e.target as ExtendedObject;
        if (target && target.customId === textId) {
          updateDuplicate();
        }
      });

      // Track text pairs
      const newPairs = new Map<string, TextPair>();
      newPairs.set(textId, {
        original: originalText,
        duplicate: duplicate
      });

      setTextPairs(newPairs);

      canvas.add(duplicate);
      canvas.bringObjectToFront(duplicate);
      canvas.renderAll();


      // const objects = canvas.getObjects();
      // const originalIndex = objects.indexOf(originalText);
      // canvas.bringObjectToFront(duplicate);
      // objects.forEach((obj, index) => {
      //   if (index > originalIndex + 1) {
      //     canvas.bringObjectToFront(obj);
      //   }

      // Cleanup when original is removed
      originalText.on('removed', () => {
        if (canvas && duplicate) {
          canvas.remove(duplicate);
          const updatedPairs = new Map(textPairs);
          updatedPairs.delete(textId);
          setTextPairs(updatedPairs);
        }
      });
    }
  }

  useEffect(() => {
    if (!showDuplicateStroke) {
      // Remove all duplicates when turning off
      textPairs.forEach(pair => {
        if (canvas && pair.duplicate) {
          canvas.remove(pair.duplicate);
        }
      });
      setTextPairs(new Map());
    } else {
      // Create duplicate for active object when turning on
      const activeObject = canvas?.getActiveObject();
      if (activeObject && activeObject.type === "textbox") {
        strokeUpward(activeObject as ExtendedTextbox);
      }
    }
  }, [showDuplicateStroke]);


  function changeFontFamily(fontFamily: string) {
    if (!canvas) return

    const activeObject = canvas.getActiveObject()
    if (activeObject && activeObject.type === "textbox") {
      const text = activeObject as ExtendedTextbox;
      text.set("fontFamily", fontFamily)


      const pair = Array.from(textPairs.values())
        .find(p => p.original.customId === text.customId);

      if (pair?.duplicate) {
        pair.duplicate.set({
          fontFamily: fontFamily,
          stroke: text.fill,
          strokeWidth: strokeSettings.width || 1.5
        });
      }
      // Immediately update the selected text properties
      setSelectedTextProperties((prev) => ({
        ...prev,
        fontFamily: fontFamily,
      }))

      canvas.renderAll()
    }
  }



  function removeStroke() {
    if (!canvas) return;

    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === "textbox") {
      const text = activeObject as fabric.Textbox;

      text.set({
        stroke: '',
        strokeWidth: 0
      });

      setStrokeSettings(prev => ({
        ...prev,
        enabled: false
      }));

      setShowStrokeUI(false);
      canvas.renderAll();
    }
  }

  function addStroke() {
    if (!canvas) return;

    // setShowStrokeUI(prev => !prev);

    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === "textbox") {
      const text = activeObject as fabric.Textbox;

      setStrokeSettings(prev => {
        const enabled = !prev.enabled;

        text.set({
          stroke: enabled ? prev.color : '',
          strokeWidth: enabled ? prev.width : 0
        });

        setShowStrokeUI(enabled);

        canvas.renderAll();

        return {
          ...prev,
          enabled
        };
      });
    }
  }




  function updateStrokeColor(color: ColorProps) {
    if (!canvas) return;

    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === "textbox") {
      const text = activeObject as ExtendedTextbox;

      if (typeof color === 'string') {
        text.set("stroke", color);
      } else if (color.type === 'gradient') {
        // Validate gradient stops
        const validStops = color.stops.filter(stop => stop.offset >= 0 && stop.offset <= 1);

        if (validStops.length !== color.stops.length) {
          toast({
            variant: "destructive",
            title: "Invalid Gradient Value",
            description: "Invalid gradient stop values. Using valid stops only.",
          });
        }

        if (validStops.length < 2) {
          toast({
            variant: "destructive",
            title: "Invalid Gradient Value",
            description: "Not enough valid gradient stops. Using default gradient.",
          });
          validStops.push({ offset: 0, color: '#FF0000' }, { offset: 1, color: '#0000FF' });
        }

        const coords = color.direction === 'horizontal'
          ? { x1: 0, y1: 0, x2: 1, y2: 0 }
          : { x1: 0, y1: 0, x2: 0, y2: 1 };

        const gradient = new fabric.Gradient({
          type: 'linear',
          gradientUnits: 'percentage',
          coords,
          colorStops: validStops.map(stop => ({ ...stop, opacity: 1 }))
        });
        text.set("stroke", gradient);
      }

      if (showDuplicateStroke) {
        const pair = Array.from(textPairs.values())
          .find(p => p.original.customId === text.customId);

        if (pair?.duplicate) {
          if (typeof color === 'string') {
            pair.duplicate.set({
              stroke: color,
              strokeWidth: text.strokeWidth || 1.5,
              fill: 'transparent'
            });
          } else if (color.type === 'gradient') {
            const duplicateGradient = new fabric.Gradient({
              type: 'linear',
              gradientUnits: 'percentage',
              coords: color.direction === 'horizontal'
                ? { x1: 0, y1: 0, x2: 1, y2: 0 }
                : { x1: 0, y1: 0, x2: 0, y2: 1 },
              colorStops: color.stops.map(stop => ({ ...stop, opacity: 1 }))
            });
            pair.duplicate.set({
              stroke: duplicateGradient,
              strokeWidth: text.strokeWidth || 1.5,
              fill: 'transparent'
            });
          }
        }
      }


      setStrokeSettings(prev => ({
        ...prev,
        color: color,
        enabled: true
      }));

      canvas.renderAll();
    }
  }
  function updateStrokeWidth() {
    if (!canvas) return;

    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === "textbox") {
      const text = activeObject as ExtendedTextbox;

      setStrokeSettings(prev => {
        let newWidth = prev.width + 0.5;
        if (newWidth > 6) {
          newWidth = 0.5;
        }

        text.set("strokeWidth", newWidth);

        if (showDuplicateStroke) {
          const pair = Array.from(textPairs.values())
            .find(p => p.original.customId === text.customId);

          if (pair?.duplicate) {
            pair.duplicate.set({
              strokeWidth: text.strokeWidth
            });
          }
        }


        canvas.renderAll();

        return {
          ...prev,
          width: newWidth,
          enabled: true
        };
      });
    }
  }


  const changeTextColor = useCallback((color: ColorProps) => {
    if (!canvas) return;

    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === "textbox") {
      const text = activeObject as fabric.Textbox;

      if (typeof color === 'string') {
        text.set("fill", color);
      } else if (color.type === 'gradient') {
        const validStops = color.stops.filter(stop => stop.offset >= 0 && stop.offset <= 1);
        if (validStops.length !== color.stops.length) {
          toast({
            variant: "destructive",
            title: "Invalid Gradient Value",
            description: "Invalid gradient stop values. Using valid stops only.",
          });
        }

        if (validStops.length < 2) {
          toast({
            variant: "destructive",
            title: "Invalid Gradient Value",
            description: "Not enough valid gradient stops. Using default gradient.",
          }); validStops.push({ offset: 0, color: '#000000' }, { offset: 1, color: '#FFFFFF' });
        }

        const coords = color.direction === 'horizontal'
          ? { x1: 0, y1: 0, x2: 1, y2: 0 }
          : { x1: 0, y1: 0, x2: 0, y2: 1 };

        const gradient = new fabric.Gradient({
          type: 'linear',
          gradientUnits: 'percentage',
          coords,
          colorStops: validStops.map(stop => ({ ...stop, opacity: 1 }))
        });
        text.set("fill", gradient);
      }

      setSelectedTextProperties((prev) => ({
        ...prev,
        fontColor: color
      }));

      canvas.renderAll();
    }
  }, [canvas]);



  // Add inside useFabric() function
  async function handleImageUpload(file: File): Promise<void> {
    try {
      setIsLoading(true)
      setUploadProgress(0)

      const imageUrl = URL.createObjectURL(file)
      console.log('handleImageUpload imageUrl:', imageUrl);
      const startTime = Date.now();
      let currentIndex = 0;

      const progressInterval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;

        if (currentIndex < loadingMessages.length &&
          elapsedTime >= loadingMessages[currentIndex].time) {
          setUploadProgress(loadingMessages[currentIndex].threshold);
          setCurrentMessage(loadingMessages[currentIndex].message);
          currentIndex++;
        }
      }, 100);


      await setupImage(imageUrl)

      clearInterval(progressInterval);
      setUploadProgress(100);
      setCurrentMessage("Complete!");

      setUploadProgress(100)
    } catch (error) {
      console.error("Error uploading image:", error)
    } finally {
      setIsLoading(false)
    }
  }

  //  layers
  const setupImage = async (imageUrl: string) => {

    console.log('Setup Image Start - canvasReady:', canvasReady);

    setCanvasReady(false);
    setIsLoading(true);
    setUploadProgress(0);


    try {

      if (!canvas && canvasRef.current) {
        const fabricCanvas = new Canvas(canvasRef.current);
        setCanvas(fabricCanvas);
        toast({
          variant: "destructive",
          title: "Connection Error",
          description: "Refresh your page or reopen website again",
        });

      }



      // Load original image
      const img = await FabricImage.fromURL(imageUrl)
      console.log('Image loaded');

      const originalWidth = img.width!;
      const originalHeight = img.height!;


      const maxWidth = window.innerWidth * 0.9;  // 90% of viewport width
      const maxHeight = window.innerHeight * 0.8; // 80% of viewport height

      // Set canvas dimensions based on original image


      // Scale and set original as background
      const scale = Math.min(
        maxWidth / originalWidth,
        maxHeight / originalHeight,
        1 // Don't scale up images smaller than viewport
      );

      const finalWidth = originalWidth * scale;
      const finalHeight = originalHeight * scale;

      canvas?.setDimensions({
        width: finalWidth,
        height: finalHeight
      });

      img.scale(scale)
      if (canvas) {
        canvas.backgroundImage = img
        canvas.renderAll()
      }

      // Remove background and add as layer
      // const imageBlob = await removeBackground(imageUrl);
      // const removedBgUrl = URL.createObjectURL(imageBlob)
      // const removedBgImage = await FabricImage.fromURL(removedBgUrl)
      const removedBgImage = img;
      setUploadProgress(100);

      // Use same scale as original
      removedBgImage.set({
        scaleX: scale,
        scaleY: scale,
        left: canvas?.width! / 2,
        top: canvas?.height! / 2,
        originX: 'center',
        originY: 'center',
        lockMovementX: true,
        lockMovementY: true,
        lockScalingX: true,
        lockScalingY: true,
        lockRotation: true,
        selectable: false,
        evented: false,
        hoverCursor: 'default',
        perPixelTargetFind: true

      })


      canvas?.add(removedBgImage)
      setRemovedBgLayer(removedBgImage)

      canvas?.renderAll()
      setCanvasReady(true);
      console.log(canvasReady);

    } catch (error) {
      console.error("Error setting up image:", error)
      setCanvasReady(false);

    }
    finally {
      setIsLoading(false);
    }
  }

  // useEffect(() => {
  //   console.log('Canvas state:', {
  //     canvasExists: !!canvas,
  //     canvasReady,
  //     isLoading
  //   });
  // }, [canvas, canvasReady, isLoading]);




  function flipImage(direction: "horizontal" | "vertical") {
    if (!canvas) return

    const activeObject = canvas.getActiveObject()

    if (activeObject && activeObject.type === "image") {
      const image = activeObject as fabric.Image
      direction === "horizontal"
        ? image.set("flipX", !image.flipX)
        : image.set("flipY", !image.flipY)

      canvas.renderAll()
    }
  }

  function toggleFilter() {
    // Move to the next filter in the list
    const nextIndex = (currentFilterIndex + 1) % filterNames.length
    setCurrentFilterIndex(nextIndex)

    // Determine the next filter
    const nextFilter = filterNames[nextIndex]

    if (!canvas) return

    const activeObject = canvas.getActiveObject()
    if (activeObject && activeObject.type === "image") {
      const image = activeObject as FabricImage
      const filter = getFilter(nextFilter)

      image.filters = filter ? [filter] : []
      image.applyFilters()
        ; (image as any).filterName = nextFilter
      canvas.renderAll()
    }
  }

  function toggleDrawingMode() {
    setDrawingSettings((prev) => ({
      ...prev,
      isDrawing: !prev.isDrawing,
    }))
  }

  function incrementBrushSize() {
    setDrawingSettings((prev) => {
      let newSize = prev.brushSize + 2
      if (newSize > 20) {
        newSize = 2
      }
      return { ...prev, brushSize: newSize }
    })
  }

  function setBrushColor(color: string) {
    setDrawingSettings((prev) => ({
      ...prev,
      brushColor: color,
    }))
  }

  function deleteSelectedObject() {
    if (!canvas) return

    const activeObject = canvas.getActiveObject()

    if (activeObject) {
      canvas.remove(activeObject)
      canvas.discardActiveObject()
      canvas.renderAll()
    }
  }

  function downloadCanvas() {
    if (!canvas) return

    const dataURL = canvas.toDataURL({
      format: "png",
      quality: 1,
      multiplier: 3,
    })

    const link = document.createElement("a")
    link.href = dataURL
    link.download = "magictext.png"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }



  return {
    uploadProgress,
    currentMessage,
    isLoading,
    canvasRef,
    addText,
    changeFontFamily,
    changeTextColor,
    canvasReady,
    showStrokeUI,
    flipImage,
    addStroke,
    removeStroke,
    deleteSelectedObject,
    downloadCanvas,
    selectedTextProperties,
    toggleFilter,
    isImageSelected,
    toggleDrawingMode,
    incrementBrushSize,
    setBrushColor,
    strokeSettings,
    drawingSettings,
    handleImageUpload,
    isObjectSelected,
    updateStrokeColor,
    updateStrokeWidth,
    showDuplicateStroke,
    setShowDuplicateStroke,
  }
}
