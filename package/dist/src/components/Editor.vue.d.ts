import { type PropType } from "vue";
import { JSONContent, Extension } from "@tiptap/vue-3";
import { EditorProps } from "@tiptap/pm/view";
import { Editor as EditorClass } from "@tiptap/core";
declare const _default: import("vue").DefineComponent<{
    /**
     * The API route to use for the Vercel Blob.
     * Defaults to "/api/upload".
     */
    blobApi: {
        type: StringConstructor;
        default: string;
    };
    /**
     * The API route to use for the OpenAI completion API.
     * Defaults to "/api/generate".
     */
    completionApi: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Additional headers to pass to the OpenAI completion API.
     * Defaults to {}.
     */
    apiHeaders: {
        type: PropType<Record<string, string>>;
        default: {};
    };
    /**
     * Additional classes to add to the editor container.
     * Defaults to "relative min-h-[500px] w-full max-w-screen-lg border-stone-200 bg-white p-12 px-8 sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:px-12 sm:shadow-lg".
     */
    className: {
        type: StringConstructor;
        default: string;
    };
    /**
     * The default value to use for the editor.
     * Defaults to defaultEditorContent.
     */
    defaultValue: {
        type: PropType<JSONContent>;
        default: () => {
            type: string;
            content: ({
                type: string;
                attrs: {
                    level: number;
                    language?: undefined;
                    tight?: undefined;
                    start?: undefined;
                };
                content: {
                    type: string;
                    text: string;
                }[];
            } | {
                type: string;
                content: ({
                    type: string;
                    marks: {
                        type: string;
                        attrs: {
                            href: string;
                            target: string;
                            class: string;
                        };
                    }[];
                    text: string;
                } | {
                    type: string;
                    text: string;
                    marks?: undefined;
                })[];
                attrs?: undefined;
            } | {
                type: string;
                attrs: {
                    language: null;
                    level?: undefined;
                    tight?: undefined;
                    start?: undefined;
                };
                content: {
                    type: string;
                    text: string;
                }[];
            } | {
                type: string;
                attrs: {
                    tight: boolean;
                    start: number;
                    level?: undefined;
                    language?: undefined;
                };
                content: {
                    type: string;
                    content: {
                        type: string;
                        content: ({
                            type: string;
                            text: string;
                            marks?: undefined;
                        } | {
                            type: string;
                            marks: {
                                type: string;
                            }[];
                            text: string;
                        })[];
                    }[]; /**
                     * The API route to use for the OpenAI completion API.
                     * Defaults to "/api/generate".
                     */
                }[];
            } | {
                type: string;
                attrs?: undefined;
                content?: undefined;
            } | {
                type: string;
                content: {
                    type: string;
                    attrs: {
                        checked: boolean;
                    };
                    content: {
                        type: string;
                        content: ({
                            type: string;
                            text: string;
                            marks?: undefined;
                        } | {
                            type: string;
                            marks: {
                                type: string;
                                attrs: {
                                    href: string;
                                    target: string;
                                    class: string;
                                };
                            }[];
                            text: string;
                        })[];
                    }[];
                }[];
                attrs?: undefined;
            })[];
        };
    };
    /**
     * A list of extensions to use for the editor, in addition to the default Novel extensions.
     * Defaults to [].
     */
    extensions: {
        type: PropType<Extension<any, any>[]>;
        default: never[];
    };
    /**
     * Props to pass to the underlying Tiptap editor, in addition to the default Novel editor props.
     * Defaults to {}.
     */
    editorProps: {
        type: PropType<EditorProps<any>>;
        default: {};
    };
    /**
     * A callback function that is called whenever the editor is updated.
     * Defaults to () => {}.
     */
    onUpdate: {
        type: PropType<(editor?: EditorClass | undefined) => void | Promise<void>>;
        default: () => void;
    };
    /**
     * A callback function that is called whenever the editor is updated, but only after the defined debounce duration.
     * Defaults to () => {}.
     */
    onDebouncedUpdate: {
        type: PropType<(editor?: EditorClass | undefined) => void | Promise<void>>;
        default: () => void;
    };
    /**
     * The duration (in milliseconds) to debounce the onDebouncedUpdate callback.
     * Defaults to 750.
     */
    debounceDuration: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * The key to use for storing the editor's value in local storage.
     * Defaults to "novel__content".
     */
    storageKey: {
        type: StringConstructor;
        default: string;
    };
    onEditorUpdate: {
        type: PropType<(json: JSONContent) => void | Promise<void>>;
        default: () => void;
    };
    initialContent: {
        type: PropType<JSONContent> | null;
        default: null;
    };
    useLocalStorage: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    editor: import("vue").ShallowRef<import("@tiptap/vue-3").Editor | undefined>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * The API route to use for the Vercel Blob.
     * Defaults to "/api/upload".
     */
    blobApi: {
        type: StringConstructor;
        default: string;
    };
    /**
     * The API route to use for the OpenAI completion API.
     * Defaults to "/api/generate".
     */
    completionApi: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Additional headers to pass to the OpenAI completion API.
     * Defaults to {}.
     */
    apiHeaders: {
        type: PropType<Record<string, string>>;
        default: {};
    };
    /**
     * Additional classes to add to the editor container.
     * Defaults to "relative min-h-[500px] w-full max-w-screen-lg border-stone-200 bg-white p-12 px-8 sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:px-12 sm:shadow-lg".
     */
    className: {
        type: StringConstructor;
        default: string;
    };
    /**
     * The default value to use for the editor.
     * Defaults to defaultEditorContent.
     */
    defaultValue: {
        type: PropType<JSONContent>;
        default: () => {
            type: string;
            content: ({
                type: string;
                attrs: {
                    level: number;
                    language?: undefined;
                    tight?: undefined;
                    start?: undefined;
                };
                content: {
                    type: string;
                    text: string;
                }[];
            } | {
                type: string;
                content: ({
                    type: string;
                    marks: {
                        type: string;
                        attrs: {
                            href: string;
                            target: string;
                            class: string;
                        };
                    }[];
                    text: string;
                } | {
                    type: string;
                    text: string;
                    marks?: undefined;
                })[];
                attrs?: undefined;
            } | {
                type: string;
                attrs: {
                    language: null;
                    level?: undefined;
                    tight?: undefined;
                    start?: undefined;
                };
                content: {
                    type: string;
                    text: string;
                }[];
            } | {
                type: string;
                attrs: {
                    tight: boolean;
                    start: number;
                    level?: undefined;
                    language?: undefined;
                };
                content: {
                    type: string;
                    content: {
                        type: string;
                        content: ({
                            type: string;
                            text: string;
                            marks?: undefined;
                        } | {
                            type: string;
                            marks: {
                                type: string;
                            }[];
                            text: string;
                        })[];
                    }[]; /**
                     * The API route to use for the OpenAI completion API.
                     * Defaults to "/api/generate".
                     */
                }[];
            } | {
                type: string;
                attrs?: undefined;
                content?: undefined;
            } | {
                type: string;
                content: {
                    type: string;
                    attrs: {
                        checked: boolean;
                    };
                    content: {
                        type: string;
                        content: ({
                            type: string;
                            text: string;
                            marks?: undefined;
                        } | {
                            type: string;
                            marks: {
                                type: string;
                                attrs: {
                                    href: string;
                                    target: string;
                                    class: string;
                                };
                            }[];
                            text: string;
                        })[];
                    }[];
                }[];
                attrs?: undefined;
            })[];
        };
    };
    /**
     * A list of extensions to use for the editor, in addition to the default Novel extensions.
     * Defaults to [].
     */
    extensions: {
        type: PropType<Extension<any, any>[]>;
        default: never[];
    };
    /**
     * Props to pass to the underlying Tiptap editor, in addition to the default Novel editor props.
     * Defaults to {}.
     */
    editorProps: {
        type: PropType<EditorProps<any>>;
        default: {};
    };
    /**
     * A callback function that is called whenever the editor is updated.
     * Defaults to () => {}.
     */
    onUpdate: {
        type: PropType<(editor?: EditorClass | undefined) => void | Promise<void>>;
        default: () => void;
    };
    /**
     * A callback function that is called whenever the editor is updated, but only after the defined debounce duration.
     * Defaults to () => {}.
     */
    onDebouncedUpdate: {
        type: PropType<(editor?: EditorClass | undefined) => void | Promise<void>>;
        default: () => void;
    };
    /**
     * The duration (in milliseconds) to debounce the onDebouncedUpdate callback.
     * Defaults to 750.
     */
    debounceDuration: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * The key to use for storing the editor's value in local storage.
     * Defaults to "novel__content".
     */
    storageKey: {
        type: StringConstructor;
        default: string;
    };
    onEditorUpdate: {
        type: PropType<(json: JSONContent) => void | Promise<void>>;
        default: () => void;
    };
    initialContent: {
        type: PropType<JSONContent> | null;
        default: null;
    };
    useLocalStorage: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    completionApi: string;
    apiHeaders: Record<string, string>;
    onEditorUpdate: (json: JSONContent) => void | Promise<void>;
    blobApi: string;
    onUpdate: (editor?: EditorClass | undefined) => void | Promise<void>;
    defaultValue: JSONContent;
    className: string;
    extensions: Extension<any, any>[];
    editorProps: EditorProps<any>;
    onDebouncedUpdate: (editor?: EditorClass | undefined) => void | Promise<void>;
    debounceDuration: number;
    storageKey: string;
    initialContent: JSONContent;
    useLocalStorage: boolean;
}, {}>;
export default _default;
