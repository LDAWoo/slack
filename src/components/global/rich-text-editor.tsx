"use client";
import "quill/dist/quill.snow.css";
import { memo } from "react";

// interface IRichTextEditor {
//     id?: string;
//     section?: Section;
//     canvasId?: string;
//     memberId?: string;
//     className?: string;
//     placeHolder?: string;
//     defaultValue?: Delta | Op[];
//     content?: string;
//     isToolbar?: boolean;
//     isPlaceholder?: boolean;
//     disable?: boolean;
//     innerRef?: MutableRefObject<Quill | null>;
//     onContentChange?: (value: string) => void;
//     onEnter?: () => void;
// }

const RichTextEditor = () => {
    // const containerRef = useRef<HTMLDivElement>(null);
    // const quillRef = useRef<Quill | null>(null);
    // const { onOpen } = useModal();
    // const { socket } = useSocket();
    // const [isFocused, setIsFocused] = useState(false);
    // const [showToolbar, setShowToolbar] = useState(false);
    // const [format, setFormat] = useState<any>({});
    // const [isBold, setIsBold] = useState(false);
    // const [isItalic, setIsItalic] = useState(false);
    // const [isUnderline, setIsUnderline] = useState(false);
    // const toolbarRef = useRef<HTMLDivElement>(null);
    // useClickOutside([containerRef, toolbarRef], () => {
    //     onCloseToolbar();
    // });

    // useEffect(() => {
    //     const storedSelection = localStorage.getItem(`quill-selection`);
    //     const lastSelection = storedSelection ? JSON.parse(storedSelection) : null;

    //     if (!containerRef.current) return;

    //     const container = containerRef.current;
    //     const editorComponent = document.createElement("div");
    //     container.appendChild(editorComponent);

    //     const options: QuillOptions = {
    //         theme: "snow",
    //         placeholder: isPlaceholder ? (isFocused ? placeHolder : "") : placeHolder,
    //         modules: {
    //             toolbar: false,
    //             keyboard: {
    //                 bindings: {
    //                     enter: {
    //                         key: "Enter",
    //                         handler: () => {
    //                             onEnter();
    //                         },
    //                     },
    //                 },
    //             },
    //         },
    //     };

    //     const quill = new Quill(editorComponent, options);
    //     quillRef.current = quill;
    //     if (innerRef) innerRef.current = quill;

    //     quill.setContents(defaultValue);
    //     if (content) quill.setContents(JSON.parse(content));

    //     if (lastSelection) {
    //         if (lastSelection.id === id) {
    //             quill.setSelection(lastSelection.index, lastSelection.length);
    //             quill.focus();
    //         }
    //     } else {
    //         quill.setSelection(quill.getLength(), quill.getLength());
    //     }

    //     quill.on(Quill.events.TEXT_CHANGE, handleTextChange);
    //     quill.on(Quill.events.SELECTION_CHANGE, handleSelectionChange);

    //     return () => {
    //         quill.off(Quill.events.TEXT_CHANGE, handleTextChange);
    //         quill.off(Quill.events.SELECTION_CHANGE, handleSelectionChange);
    //         container.innerHTML = "";
    //         quillRef.current = null;
    //         if (innerRef?.current) innerRef.current = null;
    //     };
    // }, [innerRef, placeHolder, defaultValue, isPlaceholder, isToolbar, content, id]);

    // useEffect(() => {
    //     if (quillRef.current && isPlaceholder) {
    //         quillRef.current.root.dataset.placeholder = isFocused ? placeHolder : "";
    //     }
    // }, [isFocused, placeHolder, isPlaceholder]);

    // const handleTextChange = () => {
    //     if (!showToolbar) {
    //         const content = JSON.stringify(quillRef.current?.getContents());
    //         onContentChange(content);
    //         saveSelection();
    //     }
    // };

    // const handleSelectionChange = (range: { index: number; length: number }) => {
    //     if (!quillRef.current) return;
    //     if (range) {
    //         saveSelection();
    //         onOpen("canvasToolbar", { quill: quillRef.current, section, sectionId: id });
    //         const format = quillRef.current.getFormat(range.index, range.length);
    //         setFormat(format);
    //         setIsBold(!!format.bold);
    //         setIsItalic(!!format.italic);
    //         setIsUnderline(!!format.underline);
    //         setShowToolbar(range.length > 0);
    //     }
    //     setIsFocused(!!range);
    // };

    // const saveSelection = () => {
    //     const range = quillRef.current?.getSelection();
    //     const selection = range ? { index: range.index + 1, length: range.length, id } : { index: 0, length: 0, id: "" };
    //     localStorage.setItem(`quill-selection`, JSON.stringify(selection));
    // };

    // const handleMouseDown = () => {
    //     if (!socket) return;

    //     const data = {
    //         canvasId,
    //         elementId: `remote-element-${id}`,
    //         memberId,
    //     };

    //     socket.emit("mousedown", data);
    // };

    // const toggleFormat = (format: string, value: boolean) => {
    //     quillRef.current?.format(format, value);
    //     onCloseToolbar();
    // };

    // const onCloseToolbar = () => {
    //     setTimeout(() => {
    //         setShowToolbar(false);
    //     }, 200);
    // };

    // return (
    //     <div className="relative h-full">
    //         <div onMouseDown={handleMouseDown} spellCheck={false} id={`remote-element-${id}`} ref={containerRef} className={cn("transition-all duration-300 h-full", className)} />
    //         <div ref={toolbarRef}>
    //             <RichTextToolBar
    //                 open={showToolbar && isToolbar}
    //                 format={format?.header || 0}
    //                 isBold={isBold}
    //                 isItalic={isItalic}
    //                 isUnderline={isUnderline}
    //                 onFormat={(format) => {
    //                     quillRef.current?.format("header", format);
    //                     onCloseToolbar();
    //                 }}
    //                 onBold={() => {
    //                     toggleFormat("bold", !isBold);
    //                     onCloseToolbar();
    //                 }}
    //                 onItalic={() => {
    //                     toggleFormat("italic", !isItalic);
    //                     onCloseToolbar();
    //                 }}
    //                 onUnderline={() => {
    //                     toggleFormat("underline", !isUnderline);
    //                     onCloseToolbar();
    //                 }}
    //             />
    //         </div>
    //     </div>
    // );
    return null;
};

export default memo(RichTextEditor);
