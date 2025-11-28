import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import { Bold, Italic, List, ListOrdered, Link as LinkIcon, Unlink } from 'lucide-react';

interface HtmlEditorProps {
  label: string;
  name: string;
  value: string;
  onChange: (html: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  minHeight?: string;
}

export function HtmlEditor({
  label,
  name,
  value,
  onChange,
  error,
  placeholder = 'Escribe aquí...',
  required = false,
  disabled = false,
  className = '',
  minHeight = '200px',
}: HtmlEditorProps) {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline hover:text-blue-800',
        },
      }),
    ],
    content: value || '',
    editable: !disabled,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
    editorProps: {
      attributes: {
        class: 'tiptap-editor focus:outline-none p-4',
        style: `min-height: ${minHeight}`,
      },
    },
  });

  React.useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '');
    }
  }, [value, editor]);

  if (!editor) {
    return null;
  }

  const setLink = () => {
    if (linkUrl === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      setShowLinkInput(false);
      return;
    }

    // Agregar https:// si no tiene protocolo
    const url = linkUrl.startsWith('http://') || linkUrl.startsWith('https://') 
      ? linkUrl 
      : `https://${linkUrl}`;

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    setShowLinkInput(false);
    setLinkUrl('');
  };

  const MenuButton = ({ onClick, active, children, title }: any) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-2 rounded hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed ${
        active ? 'bg-gray-200' : ''
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium mb-1">
        {label}
        {required && ' *'}
      </label>
      
      <div className={`border rounded-md overflow-hidden bg-white ${
        error ? 'border-red-500' : 'border-gray-300'
      } ${disabled ? 'opacity-60' : ''}`}>
        {/* Barra de herramientas */}
        <div className="flex gap-1 p-2 border-b border-gray-300 bg-gray-50 flex-wrap">
          <MenuButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive('bold')}
            title="Negrita (Ctrl+B)"
          >
            <Bold size={18} />
          </MenuButton>
          
          <MenuButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive('italic')}
            title="Cursiva (Ctrl+I)"
          >
            <Italic size={18} />
          </MenuButton>
          
          <div className="w-px bg-gray-300 mx-1" />
          
          <MenuButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive('bulletList')}
            title="Lista con viñetas"
          >
            <List size={18} />
          </MenuButton>
          
          <MenuButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive('orderedList')}
            title="Lista numerada"
          >
            <ListOrdered size={18} />
          </MenuButton>

          <div className="w-px bg-gray-300 mx-1" />
          
          <MenuButton
            onClick={() => {
              const previousUrl = editor.getAttributes('link').href;
              setLinkUrl(previousUrl || '');
              setShowLinkInput(!showLinkInput);
            }}
            active={editor.isActive('link')}
            title="Insertar enlace"
          >
            <LinkIcon size={18} />
          </MenuButton>

          {editor.isActive('link') && (
            <MenuButton
              onClick={() => editor.chain().focus().unsetLink().run()}
              active={false}
              title="Quitar enlace"
            >
              <Unlink size={18} />
            </MenuButton>
          )}
        </div>

        {/* Input para URL */}
        {showLinkInput && (
          <div className="p-3 border-b border-gray-300 bg-gray-50 flex gap-2">
            <input
              type="text"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  setLink();
                }
                if (e.key === 'Escape') {
                  setShowLinkInput(false);
                  setLinkUrl('');
                }
              }}
              placeholder="https://ejemplo.com"
              className="flex-1 px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <button
              type="button"
              onClick={setLink}
              className="px-4 py-1.5 bg-primary text-white rounded text-sm hover:bg-primary/70 transition"
            >
              Aplicar
            </button>
            <button
              type="button"
              onClick={() => {
                setShowLinkInput(false);
                setLinkUrl('');
              }}
              className="px-4 py-1.5 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300 transition"
            >
              Cancelar
            </button>
          </div>
        )}

        {/* Editor */}
        <EditorContent editor={editor} />
      </div>

      {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
      
      {/* Estilos para que las listas y enlaces funcionen correctamente */}
      <style>{`
        .tiptap-editor ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin: 0.5rem 0;
        }
        
        .tiptap-editor ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin: 0.5rem 0;
        }
        
        .tiptap-editor li {
          margin: 0.25rem 0;
        }
        
        .tiptap-editor li p {
          margin: 0;
          display: inline;
        }
        
        .tiptap-editor ul ul {
          list-style-type: circle;
          margin: 0.25rem 0;
        }
        
        .tiptap-editor ol ol {
          list-style-type: lower-alpha;
          margin: 0.25rem 0;
        }
        
        .tiptap-editor p {
          margin: 0.5rem 0;
        }
        
        .tiptap-editor p:first-child {
          margin-top: 0;
        }
        
        .tiptap-editor strong {
          font-weight: 600;
        }
        
        .tiptap-editor em {
          font-style: italic;
        }

        .tiptap-editor a {
          color: #2563eb;
          text-decoration: underline;
          cursor: pointer;
        }

        .tiptap-editor a:hover {
          color: #1e40af;
        }
      `}</style>
    </div>
  );
}





/* usar de esta forma

  const [descripcion, setDescripcion] = useState('');

  <HtmlEditor
      label="Descripción del Tour"
      name="descripcion"
      value={descripcion}
      onChange={(html) => setDescripcion(html)}
      error="" // o tu mensaje de error
      placeholder="Escribe la descripción aquí..."
      required={true}
      disabled={false}
      minHeight="300px"
    />


con react form
<HtmlEditor
                    label="Descripción"
                    name="descripcion"
                    value={data.descripcion}
                    onChange={(html) => setData({ ...data, descripcion: html })}
                    error={errors.descripcion}
                    placeholder="Escribe una descripción..."
                    required
                    minHeight="300px"
                />
*/
