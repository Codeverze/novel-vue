// import { BlobResult } from "@vercel/blob";
import { useStorage } from "@vueuse/core";
import { toast } from "sonner";
import { EditorState, Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet, EditorView } from "@tiptap/pm/view";
import axios from "axios";

const uploadKey = new PluginKey("upload-image");

const UploadImagesPlugin = () =>
  new Plugin({
    key: uploadKey,
    state: {
      init() {
        return DecorationSet.empty;
      },
      apply(tr, set) {
        set = set.map(tr.mapping, tr.doc);
        // See if the transaction adds or removes any placeholders
        const action = tr.getMeta(this as any);
        if (action && action.add) {
          const { id, pos, src } = action.add;

          const placeholder = document.createElement("div");
          placeholder.setAttribute("class", "img-placeholder");
          const image = document.createElement("img");
          image.setAttribute(
            "class",
            "opacity-40 rounded-lg border border-stone-200"
          );
          image.src = src;
          placeholder.appendChild(image);
          const deco = Decoration.widget(pos + 1, placeholder, {
            id,
          });
          set = set.add(tr.doc, [deco]);
        } else if (action && action.remove) {
          set = set.remove(
            set.find(undefined, undefined, (spec) => spec.id == action.remove.id)
          );
        }
        return set;
      },
    },
    props: {
      decorations(state) {
        return this.getState(state);
      },
    },
  });

export default UploadImagesPlugin;

interface BlobFile {
  src: string;
  type: string;
  name: string;
  size: number;
  lastModified: number;
}
function findPlaceholder(state: EditorState, id: {}) {
  const decos = uploadKey.getState(state);
  const found = decos.find(null, null, (spec: any) => spec.id == id);
  return found.length ? found[0].from : null;
}

export function startImageUpload(file: File, view: EditorView, pos: number) {
  // check if the file is an image
  if (!file.type.includes("image/")) {
    toast.error("File type not supported.");
    return;

    // check if the file size is less than 20MB
  } else if (file.size / 1024 / 1024 > 20) {
    toast.error("File size too big (max 20MB).");
    return;
  }

  // A fresh object to act as the ID for this upload
  const id = {};

  // Replace the selection with a placeholder
  const tr = view.state.tr;
  if (!tr.selection.empty) tr.deleteSelection();

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    tr.setMeta(uploadKey, {
      add: {
        id,
        pos,
        src: reader.result,
      },
    });
    view.dispatch(tr);

    const blobFile: BlobFile = {
      src: reader.result as string,
      type: file.type,
      name: file.name,
      size: file.size,
      lastModified: file.lastModified,
    };

    handleImageUpload(blobFile).then((src) => {
      if (!src) return;


      const { schema } = view.state;

      let pos = findPlaceholder(view.state, id);

      if (pos == null) return;

      const imageSrc = typeof src === "object" ? reader.result : src;

      const node = schema.nodes.image.create({ src: imageSrc });

      const transaction = view.state.tr
        .replaceWith(pos, pos, node)
        .setMeta(uploadKey, { remove: { id } });

      view.dispatch(transaction);
    });
  }
};


export const handleImageUpload = async (file: BlobFile) => {
  const url = useStorage('blobApi', '/api/upload').value;
  const headers = useStorage<Record<string, string>>('apiHeaders', {});
  const blob = dataURLtoBlob(file.src);
  headers.value["content-type"] = "multipart/form-data";

  const imageFile = new File([blob], file.name, {
    type: file.type,
    lastModified: file.lastModified,
  });

  const formData = new FormData();
  formData.append('file', imageFile);
  try {
    const response = await axios.post(url, formData, {
      headers: headers.value
    })

    if (response.status === 200) {
      return response.data.url;
    }

  } catch (error) {
    console.error(error)
    return;
  }
};

function dataURLtoBlob(dataurl: string): Blob {
  const arr = dataurl.split(',');
  const mimeMatch = arr[0].match(/:(.*?);/);

  if (!mimeMatch) {
    throw new Error('Invalid data URL');
  }

  const mime = mimeMatch[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], { type: mime });
}