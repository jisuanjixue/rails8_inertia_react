import {
    AIHighlight,
    CharacterCount,
    CodeBlockLowlight,
    Color,
    CustomKeymap,
    GlobalDragHandle,
    HighlightExtension,
    HorizontalRule,
    MarkdownExtension,
    Placeholder,
    StarterKit,
    TaskItem,
    TaskList,
    TextStyle,
    TiptapImage,
    TiptapLink,
    TiptapUnderline,
    Twitter,
    UpdatedImage,
    Youtube,
    Mathematics,
  } from "novel/extensions";
  import { UploadImagesPlugin } from "novel/plugins";
  
  import { cx } from "class-variance-authority";
  import { common, createLowlight } from "lowlight";
  
  //TODO I am using cx here to get tailwind autocomplete working, idk if someone else can write a regex to just capture the class key in objects
  const aiHighlight = AIHighlight.configure({
    // 自定义高亮颜色
    highlightClass: 'bg-yellow-200 dark:bg-yellow-800', 
    
    // 添加动画效果
    animationClass: 'animate-pulse',
    
    // 高亮持续时间 (毫秒)
    duration: 3000,
    
    // 是否在文档加载时自动高亮
    autoHighlight: true,
    
    // 自定义高亮元素
    renderHighlight: (content: string) => {
      return `<span class="custom-highlight">${content}</span>`;
    }
  });
  //You can overwrite the placeholder with your own configuration
  const placeholder = Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === "heading") {
        return `Heading ${node.attrs.level}`;
      }
      return "按下/ 选择你想输入的主题";  // 这里改成你想要的默认提示
    },
    showOnlyWhenEditable: true,
    showOnlyCurrent: true,
    includeChildren: true, 
  });
  const tiptapLink = TiptapLink.configure({
    HTMLAttributes: {
      class: cx(
        "text-muted-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer",
      ),
    },
  });
  
  const tiptapImage = TiptapImage.extend({
    addProseMirrorPlugins() {
      return [
        UploadImagesPlugin({
          imageClass: cx("opacity-40 rounded-lg border border-stone-200"),
        }),
      ];
    },
  }).configure({
    allowBase64: true,
    HTMLAttributes: {
      class: cx("rounded-lg border border-muted"),
    },
  });
  
  const updatedImage = UpdatedImage.configure({
    HTMLAttributes: {
      class: cx("rounded-lg border border-muted"),
    },
  });
  
  const taskList = TaskList.configure({
    HTMLAttributes: {
      class: cx("not-prose pl-2 "),
    },
  });
  const taskItem = TaskItem.configure({
    HTMLAttributes: {
      class: cx("flex gap-2 items-start my-4"),
    },
    nested: true,
  });
  
  const horizontalRule = HorizontalRule.configure({
    HTMLAttributes: {
      class: cx("mt-4 mb-6 border-t border-muted-foreground"),
    },
  });
  
  const starterKit = StarterKit.configure({
    bulletList: {
      HTMLAttributes: {
        class: cx("list-disc list-outside leading-3 -mt-2"),
      },
    },
    orderedList: {
      HTMLAttributes: {
        class: cx("list-decimal list-outside leading-3 -mt-2"),
      },
    },
    listItem: {
      HTMLAttributes: {
        class: cx("leading-normal -mb-2"),
      },
    },
    blockquote: {
      HTMLAttributes: {
        class: cx("border-l-4 border-primary"),
      },
    },
    codeBlock: {
      HTMLAttributes: {
        class: cx("rounded-md bg-muted text-muted-foreground border p-5 font-mono font-medium"),
      },
    },
    code: {
      HTMLAttributes: {
        class: cx("rounded-md bg-muted  px-1.5 py-1 font-mono font-medium"),
        spellcheck: "false",
      },
    },
    horizontalRule: false,
    dropcursor: {
      color: "#DBEAFE",
      width: 4,
    },
    gapcursor: false,
  });
  
  const codeBlockLowlight = CodeBlockLowlight.configure({
    // configure lowlight: common /  all / use highlightJS in case there is a need to specify certain language grammars only
    // common: covers 37 language grammars which should be good enough in most cases
    lowlight: createLowlight(common),
  });
  
  const youtube = Youtube.configure({
    HTMLAttributes: {
      class: cx("rounded-lg border border-muted"),
    },
    inline: false,
  });
  
  const twitter = Twitter.configure({
    HTMLAttributes: {
      class: cx("not-prose"),
    },
    inline: false,
  });
  
  const mathematics = Mathematics.configure({
    HTMLAttributes: {
      class: cx("text-foreground rounded p-1 hover:bg-accent cursor-pointer"),
    },
    katexOptions: {
      throwOnError: false,
    },
  });
  
  const characterCount = CharacterCount.configure();
  
  const markdownExtension = MarkdownExtension.configure({
    html: true,
    tightLists: true,
    tightListClass: 'tight',
    bulletListMarker: '-',
    linkify: false,
    breaks: false,
    transformPastedText: false,
    transformCopiedText: false,
  });
  
  export const defaultExtensions = [
    starterKit,
    placeholder,
    tiptapLink,
    tiptapImage,
    updatedImage,
    taskList,
    taskItem,
    horizontalRule,
    aiHighlight,
    codeBlockLowlight,
    youtube,
    twitter,
    mathematics,
    characterCount,
    TiptapUnderline,
    markdownExtension,
    HighlightExtension,
    TextStyle,
    Color,
    CustomKeymap,
    GlobalDragHandle,
  ];
  