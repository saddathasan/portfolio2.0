/**
 * Rich Text Editor Component
 * 
 * A comprehensive TipTap-based rich text editor for creating and editing blog posts.
 * Features a modern toolbar with formatting options, link insertion, image handling,
 * code blocks with syntax highlighting, and table support.
 * 
 * Features:
 * - Rich text formatting (bold, italic, underline, strikethrough)
 * - Headings (H1-H6)
 * - Lists (ordered and unordered)
 * - Links with URL validation
 * - Images with URL insertion
 * - Code blocks with syntax highlighting
 * - Tables with full editing support
 * - Blockquotes and horizontal rules
 * - Undo/Redo functionality
 * - Responsive design
 */

import React, { useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import { createLowlight } from 'lowlight';

// Create lowlight instance
const lowlight = createLowlight();
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Link as LinkIcon,
  Image as ImageIcon,
  List,
  ListOrdered,
  Quote,
  Minus,
  Undo,
  Redo,
  Table as TableIcon,
  Heading1,
  Heading2,
  Heading3,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

// =============================================================================
// Types
// =============================================================================

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
  editable?: boolean;
}

interface LinkDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (url: string, text?: string) => void;
  initialUrl?: string;
  initialText?: string;
}

interface ImageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (url: string, alt?: string) => void;
}

// =============================================================================
// Link Dialog Component
// =============================================================================

const LinkDialog: React.FC<LinkDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialUrl = '',
  initialText = '',
}) => {
  const [url, setUrl] = React.useState(initialUrl);
  const [text, setText] = React.useState(initialText);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url.trim(), text.trim() || undefined);
      onClose();
      setUrl('');
      setText('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Insert Link</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="text">Link Text (optional)</Label>
            <Input
              id="text"
              placeholder="Link text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Insert Link</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// =============================================================================
// Image Dialog Component
// =============================================================================

const ImageDialog: React.FC<ImageDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [url, setUrl] = React.useState('');
  const [alt, setAlt] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url.trim(), alt.trim() || undefined);
      onClose();
      setUrl('');
      setAlt('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Insert Image</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="alt">Alt Text</Label>
            <Input
              id="alt"
              placeholder="Describe the image"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Insert Image</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// =============================================================================
// Main Rich Text Editor Component
// =============================================================================

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content,
  onChange,
  className = '',
  editable = true,
}) => {
  const [linkDialogOpen, setLinkDialogOpen] = React.useState(false);
  const [imageDialogOpen, setImageDialogOpen] = React.useState(false);

  // Initialize TipTap editor with extensions
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false, // We'll use CodeBlockLowlight instead
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 hover:text-blue-800 underline',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: 'bg-gray-100 dark:bg-gray-800 rounded-md p-4 font-mono text-sm',
        },
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'border-collapse border border-gray-300 dark:border-gray-600',
        },
      }),
      TableRow.configure({
        HTMLAttributes: {
          class: 'border border-gray-300 dark:border-gray-600',
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class: 'border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 font-semibold p-2',
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: 'border border-gray-300 dark:border-gray-600 p-2',
        },
      }),
    ],
    content,
    editable,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[300px] p-4',
      },
    },
  });

  // Toolbar button handlers
  const handleBold = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    editor?.chain().focus().toggleBold().run();
  }, [editor]);

  const handleItalic = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    editor?.chain().focus().toggleItalic().run();
  }, [editor]);

  const handleUnderline = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    editor?.chain().focus().toggleUnderline().run();
  }, [editor]);

  const handleStrike = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    editor?.chain().focus().toggleStrike().run();
  }, [editor]);

  const handleCode = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    editor?.chain().focus().toggleCode().run();
  }, [editor]);

  const handleHeading = useCallback((level: 1 | 2 | 3, e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    editor?.chain().focus().toggleHeading({ level }).run();
  }, [editor]);

  const handleBulletList = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    editor?.chain().focus().toggleBulletList().run();
  }, [editor]);

  const handleOrderedList = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    editor?.chain().focus().toggleOrderedList().run();
  }, [editor]);

  const handleBlockquote = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    editor?.chain().focus().toggleBlockquote().run();
  }, [editor]);

  const handleHorizontalRule = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    editor?.chain().focus().setHorizontalRule().run();
  }, [editor]);

  const handleUndo = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    editor?.chain().focus().undo().run();
  }, [editor]);

  const handleRedo = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    editor?.chain().focus().redo().run();
  }, [editor]);

  const handleLinkInsert = useCallback((url: string, text?: string) => {
    if (text) {
      editor?.chain().focus().insertContent(`<a href="${url}">${text}</a>`).run();
    } else {
      editor?.chain().focus().setLink({ href: url }).run();
    }
  }, [editor]);

  const handleImageInsert = useCallback((url: string, alt?: string) => {
    editor?.chain().focus().setImage({ src: url, alt }).run();
  }, [editor]);

  const handleTableInsert = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  }, [editor]);

  const handleLinkDialogOpen = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setLinkDialogOpen(true);
  }, []);

  const handleImageDialogOpen = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setImageDialogOpen(true);
  }, []);

  if (!editor) {
    return <div className="animate-pulse bg-gray-200 h-64 rounded-md" />;
  }

  return (
    <div className={`border border-gray-300 dark:border-gray-600 rounded-lg ${className}`}>
      {/* Toolbar */}
      {editable && (
        <div className="border-b border-gray-300 dark:border-gray-600 p-2">
          <div className="flex flex-wrap items-center gap-1">
            {/* Text Formatting */}
            <Button
              type="button"
              variant={editor.isActive('bold') ? 'default' : 'ghost'}
              size="sm"
              onClick={handleBold}
              title="Bold"
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant={editor.isActive('italic') ? 'default' : 'ghost'}
              size="sm"
              onClick={handleItalic}
              title="Italic"
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant={editor.isActive('underline') ? 'default' : 'ghost'}
              size="sm"
              onClick={handleUnderline}
              title="Underline"
            >
              <Underline className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant={editor.isActive('strike') ? 'default' : 'ghost'}
              size="sm"
              onClick={handleStrike}
              title="Strikethrough"
            >
              <Strikethrough className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant={editor.isActive('code') ? 'default' : 'ghost'}
              size="sm"
              onClick={handleCode}
              title="Inline Code"
            >
              <Code className="h-4 w-4" />
            </Button>

            <Separator orientation="vertical" className="h-6" />

            {/* Headings */}
            <Button
              type="button"
              variant={editor.isActive('heading', { level: 1 }) ? 'default' : 'ghost'}
              size="sm"
              onClick={(e) => handleHeading(1, e)}
              title="Heading 1"
            >
              <Heading1 className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant={editor.isActive('heading', { level: 2 }) ? 'default' : 'ghost'}
              size="sm"
              onClick={(e) => handleHeading(2, e)}
              title="Heading 2"
            >
              <Heading2 className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant={editor.isActive('heading', { level: 3 }) ? 'default' : 'ghost'}
              size="sm"
              onClick={(e) => handleHeading(3, e)}
              title="Heading 3"
            >
              <Heading3 className="h-4 w-4" />
            </Button>

            <Separator orientation="vertical" className="h-6" />

            {/* Lists */}
            <Button
              type="button"
              variant={editor.isActive('bulletList') ? 'default' : 'ghost'}
              size="sm"
              onClick={handleBulletList}
              title="Bullet List"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant={editor.isActive('orderedList') ? 'default' : 'ghost'}
              size="sm"
              onClick={handleOrderedList}
              title="Numbered List"
            >
              <ListOrdered className="h-4 w-4" />
            </Button>

            <Separator orientation="vertical" className="h-6" />

            {/* Media & Links */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleLinkDialogOpen}
              title="Insert Link"
            >
              <LinkIcon className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleImageDialogOpen}
              title="Insert Image"
            >
              <ImageIcon className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleTableInsert}
              title="Insert Table"
            >
              <TableIcon className="h-4 w-4" />
            </Button>

            <Separator orientation="vertical" className="h-6" />

            {/* Block Elements */}
            <Button
              type="button"
              variant={editor.isActive('blockquote') ? 'default' : 'ghost'}
              size="sm"
              onClick={handleBlockquote}
              title="Blockquote"
            >
              <Quote className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleHorizontalRule}
              title="Horizontal Rule"
            >
              <Minus className="h-4 w-4" />
            </Button>

            <Separator orientation="vertical" className="h-6" />

            {/* Undo/Redo */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleUndo}
              disabled={!editor.can().undo()}
              title="Undo"
            >
              <Undo className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRedo}
              disabled={!editor.can().redo()}
              title="Redo"
            >
              <Redo className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Editor Content */}
      <div className="min-h-[300px]">
        <EditorContent
          editor={editor}
          className="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl max-w-none"
        />
      </div>

      {/* Dialogs */}
      <LinkDialog
        isOpen={linkDialogOpen}
        onClose={() => setLinkDialogOpen(false)}
        onSubmit={handleLinkInsert}
      />
      <ImageDialog
        isOpen={imageDialogOpen}
        onClose={() => setImageDialogOpen(false)}
        onSubmit={handleImageInsert}
      />
    </div>
  );
};

export default RichTextEditor;