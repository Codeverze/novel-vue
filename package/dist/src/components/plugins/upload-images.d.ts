import { Plugin } from "@tiptap/pm/state";
import { DecorationSet, EditorView } from "@tiptap/pm/view";
declare const UploadImagesPlugin: () => Plugin<DecorationSet>;
export default UploadImagesPlugin;
interface BlobFile {
    src: string;
    type: string;
    name: string;
    size: number;
    lastModified: number;
}
export declare function startImageUpload(file: File, view: EditorView, pos: number): void;
export declare const handleImageUpload: (file: BlobFile) => Promise<any>;
