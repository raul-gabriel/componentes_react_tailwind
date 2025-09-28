import { useEffect, useState, useRef } from 'react';
import type { ReactNode } from 'react';

interface AccordionProps {
  titulo: string;
  forceOpen?: boolean;
  className?: string;
  children: ReactNode;
  defaultOpen?: boolean; // Opción para estado inicial
  onToggle?: (isOpen: boolean) => void; // Callback opcional para el padre
}

const Accordion = ({
  titulo,
  forceOpen,
  className,
  children,
  defaultOpen = false,
  onToggle,
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(forceOpen ?? defaultOpen);
  const lastForceOpen = useRef(forceOpen);

  // Detecta cambios en forceOpen y los sincroniza
  useEffect(() => {
    if (forceOpen !== lastForceOpen.current) {
      const newState = forceOpen ?? false;
      setIsOpen(newState);
      lastForceOpen.current = forceOpen;
      
      // Notificar al componente padre del cambio
      onToggle?.(newState);
    }
  }, [forceOpen, onToggle]);

  const toggleAccordion = () => {
    setIsOpen((prev) => {
      const newState = !prev;
      lastForceOpen.current = undefined; // Prioriza la acción del usuario
      
      // Notificar al componente padre del cambio
      onToggle?.(newState);
      
      return newState;
    });
  };

  return (
    <div className={`border border-gray-200 rounded-lg bg-gray-50 overflow-hidden transition-all duration-200 ${className ?? ''}`}>
      <button
        type="button"
        onClick={toggleAccordion}
        className="w-full flex justify-between items-center px-4 py-3 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset transition-colors duration-150"
        aria-expanded={isOpen}
        aria-controls="accordion-content"
      >
        <span className="text-md font-extrabold text-primary">{titulo}</span>
        <span
          className={`transform transition-transform duration-300 text-gray-600 ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        >
         <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gray-500"
            viewBox="0 0 24 24"
          >
            <g fill="none" fillRule="evenodd">
              <path d="M24 0v24H0V0z" />
              <path
                fill="currentColor"
                d="M13.06 16.06a1.5 1.5 0 0 1-2.12 0l-5.658-5.656a1.5 1.5 0 1 1 2.122-2.121L12 12.879l4.596-4.596a1.5 1.5 0 0 1 2.122 2.12l-5.657 5.658Z"
              />
            </g>
          </svg>
        </span>
      </button>

      <div 
        id="accordion-content"
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-3 bg-white text-sm text-gray-700">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;

/*

1. Formulario con validación
<Accordion
  titulo={`Viajero #${index + 1}`}
  forceOpen={!!errors.travelers?.[index]}
  className="mb-6"
>

</Accordion>


2. FAQ:
<Accordion
  titulo="¿Cómo cancelar?"
  defaultOpen={false}
>
  <p>Respuesta aquí...</p>
</Accordion>


3. Dashboard con métricas:
<Accordion
  titulo="Ventas del Mes"
  defaultOpen={true}
  className="border-blue-200"
  onToggle={(isOpen) => console.log('Ventas:', isOpen)}
>
  <div>Gráficos y números...</div>
</Accordion>



4. Configuración:
<Accordion
  titulo="Notificaciones"
  forceOpen={hasErrors}
>
  <div>Checkboxes y switches...</div>
</Accordion>

*/