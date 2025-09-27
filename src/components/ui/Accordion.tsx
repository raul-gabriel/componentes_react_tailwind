import { useState } from 'react';
import type { ReactNode } from 'react';

interface AccordionProps {
    titulo: string;
    abiertoPorDefecto?: boolean;
    children: ReactNode;
}

const Accordion = ({ titulo, abiertoPorDefecto = false, children }: AccordionProps) => {
    const [abierto, setAbierto] = useState<boolean>(abiertoPorDefecto);

    const toggleAccordion = () => setAbierto((prev) => !prev);

    return (
        <div className="border border-gray-200 rounded-lg bg-gray-50 overflow-hidden ">
            <button
                onClick={toggleAccordion}
                className="w-full flex justify-between items-center px-4 py-3 "
            >
                <span className="text-sm font-medium text-gray-800">{titulo}</span>
                <span
                    className={`transform transition-transform duration-300 text-gray-600 ${abierto ? 'rotate-180' : ''
                        }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" /><path fill="currentColor" d="M13.06 16.06a1.5 1.5 0 0 1-2.12 0l-5.658-5.656a1.5 1.5 0 1 1 2.122-2.121L12 12.879l4.596-4.596a1.5 1.5 0 0 1 2.122 2.12l-5.657 5.658Z" /></g></svg>
                </span>
            </button>

            {abierto && (
                <div className="px-4 py-3 bg-white text-sm text-gray-700 animate-fade-in-down">
                    {children}
                </div>
            )}
        </div>
    );
};

export default Accordion;


/*

  <Accordion titulo="Selecciona una fecha" abiertoPorDefecto={false}>
                                <p className="text-gray-600">Por favor selecciona una fecha de inicio y fin para continuar.</p>
                            </Accordion>

*/