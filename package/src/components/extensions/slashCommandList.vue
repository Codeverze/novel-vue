<template>
  <div v-if="items.length > 0" ref="commandListContainer"
    class="z-50 h-auto max-h-[330px] w-72 overflow-y-auto rounded-md border border-stone-200 bg-white px-1 py-2 shadow-md transition-all">
    <button v-for="(item, index) in items"
      class="flex items-center w-full px-2 py-1 space-x-2 text-sm text-left rounded-md text-stone-900 hover:bg-stone-100"
      :class="index === selectedIndex ? 'bg-stone-100 text-stone-900' : ''" :key="index" @click="selectItem(index)">
      <div class="flex items-center justify-center w-10 h-10 bg-white border rounded-md border-stone-200">
        <LoadingCircle v-if="item.title === 'Continue writing' && isLoading" />
        <component v-else :is="item.icon" size="18" />
      </div>
      <div>
        <p class="font-medium">{{ item.title }}</p>
        <p class="text-xs text-stone-500">{{ item.description }}</p>
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
import { inject, PropType, ref, watch } from "vue";
import { Editor, JSONContent, Range } from "@tiptap/core";
import { SuggestionItem } from "./slashExtension";
import LoadingCircle from "../icons/loadingCircle.vue";
import { useCompletion } from "ai/vue";
import { getPrevText } from "../../lib/editor";
import { customComplete } from "../../lib/api";

const props = defineProps({
  items: {
    type: Array as PropType<SuggestionItem[]>,
    required: true,
  },
  command: {
    type: Function,
    required: true,
  },
  editor: {
    type: Object as PropType<Editor>,
    required: true,
  },
  range: {
    type: Object as PropType<Range>,
    required: true,
  },
});

const selectedIndex = ref(0);

const { completion, isLoading, setCompletion } = useCompletion({
  id: "novel-vue",
  api: inject("completionApi"),
  headers: inject("apiHeaders"),
  onResponse: (_) => {
    props.editor.chain().focus().deleteRange(props.range).run();
  },
  onFinish: (_prompt, completion) => {
    // highlight the generated text
    props.editor.commands.setTextSelection({
      from: props.range.from,
      to: props.range.from + completion.length,
    });
  },
  onError: (e) => {
    console.error(e);
  },
});

const commandListContainer = ref<HTMLDivElement>();

const navigationKeys = ["ArrowUp", "ArrowDown", "Enter"];
function onKeyDown(e: KeyboardEvent) {
  if (navigationKeys.includes(e.key)) {
    e.preventDefault();
    if (e.key === "ArrowUp") {
      selectedIndex.value =
        (selectedIndex.value + props.items.length - 1) % props.items.length;
      scrollToSelected();
      return true;
    }
    if (e.key === "ArrowDown") {
      selectedIndex.value = (selectedIndex.value + 1) % props.items.length;

      scrollToSelected();
      return true;
    }
    if (e.key === "Enter") {
      selectItem(selectedIndex.value);
      return true;
    }
    return false;
  }
}

watch(
  () => props.items,
  () => {
    selectedIndex.value = 0;
  }
);

defineExpose({
  onKeyDown,
});

const onEditorUpdate = inject("onEditorUpdate") as (editor: JSONContent) => void;

function selectItem(index: number) {
  const item = props.items[index];
  const headers = inject("apiHeaders") as Record<string, string>;
  const completionApi = inject("completionApi") as string;
  if (item) {
    if (item.title === "Continue writing") {
      if (isLoading.value) return;

      isLoading.value = true;

      // Reset the completion before starting a new one
      setCompletion('');

      customComplete(getPrevText(props.editor, {
        chars: 5000,
        offset: 1,
      }), {
        ...headers
      }, completionApi).then((response) => {
        setCompletion(response);
        props.editor.chain().focus().deleteRange(props.range).run()
        isLoading.value = false;

        onEditorUpdate(props.editor.getJSON());
      });
    } else {
      props.command(item);
    }
  }
}

function updateScrollView(container: HTMLElement, item: HTMLElement) {
  const containerHeight = container.offsetHeight;
  const itemHeight = item ? item.offsetHeight : 0;

  const top = item.offsetTop;
  const bottom = top + itemHeight;

  if (top < container.scrollTop) {
    container.scrollTop -= container.scrollTop - top + 5;
  } else if (bottom > containerHeight + container.scrollTop) {
    container.scrollTop += bottom - containerHeight - container.scrollTop + 5;
  }
}

function scrollToSelected() {
  const container = commandListContainer.value;
  const item = container?.children[selectedIndex.value] as HTMLElement;

  if (container && item) {
    updateScrollView(container, item);
  }
}

// Add the watch function here
watch(
  () => completion.value,
  (newCompletion, oldCompletion) => {
    const diff = newCompletion?.slice(oldCompletion?.length);
    if (diff) {
      props.editor.commands.insertContent(diff);
    }
  }
);
</script>
