

import React, { useRef } from "react"
import { Stepper, Step, StepNext, StepBack, type StepperRef } from "@/components/ui/stepper"
import { StepBackVertical, StepNextVertical, StepperVertical, StepVertical, type StepperVerticalRef } from "@/components/ui/StepperVertical"

export function StepperHorizontalPrueba() {
  const stepperRef = useRef<StepperRef>(null)

  // Funciones para controlar el stepper desde afuera
  const handleSiguiente = () => {
    stepperRef.current?.siguiente()
  }

  const handleAnterior = () => {
    stepperRef.current?.anterior()
  }

  const handleIrAPaso = (paso: number) => {
    stepperRef.current?.irA(paso)
  }

  return (
    <>
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">🎯 Stepper con Control Total</h1>

        {/* Stepper controlado por ref */}
        <Stepper
          ref={stepperRef}
          defaultStep={0}
          onStepChange={(step) => console.log(`Paso cambiado a: ${step + 1}`)}
          className="max-w-4xl mx-auto"
        >
          {/* STEP 1 - Con botones propios */}
          <Step >
            <div className="bg-white p-8 rounded-lg border shadow-sm">
              <h2 className="text-2xl font-bold mb-6 ">📝 Paso 1</h2>



            </div>
            <button onClick={handleSiguiente} className="px-6 py-3 bg-primariry text-white bg-primary rounded-lg font-medium">
              Continuar →
            </button>

          </Step>

          {/* STEP 2 - Con botones por defecto del stepper */}
          <Step title="Paso 2" description="Contacto">
            <div className="bg-white p-8 rounded-lg border shadow-sm">
              <h2 className="text-2xl font-bold mb-6 ">📧 Paso 2</h2>
            </div>

            {/* Usando los botones por defecto del stepper */}
            <div className="flex justify-between mt-6">
              <StepBack>← Regresar</StepBack>
              <StepNext>Continuar →</StepNext>
            </div>
          </Step>

          {/* STEP 3 - Combinando botones propios y del stepper */}
          <Step title="Paso 3" description="Confirmación">
            <div className="bg-white p-8 rounded-lg border shadow-sm">
              <h2 className="text-2xl font-bold mb-6 text-purple-600"> Paso 3</h2>
            </div>

            {/* Combinando: botón del stepper + botón propio */}
            <div className="flex justify-between mt-6">
              <StepBack>← Regresar</StepBack>
              <StepNext>Continuar →</StepNext>

            </div>
          </Step>

          {/* STEP 4 - Solo con botones del stepper */}
          <Step title="Paso 4" description="Final">
            <div className="bg-white p-8 rounded-lg border shadow-sm">
              <h2 className="text-2xl font-bold mb-6 ">Paso 4: Proceso Completado</h2>

            </div>

            {/* Solo botones del stepper con validación */}
            <div className="flex justify-between mt-6">
              <StepBack> regresar</StepBack>
              <StepNext
                onClick={() => alert("¡Todo completado!")}
                className="bg-green-600 hover:bg-green-700"
              >
                🚀 Terminar
              </StepNext>
            </div>
          </Step>
        </Stepper>

        {/* Controles externos opcionales */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">🎮 Controles Externos (Opcional)</h3>

            <div className="mt-4 flex gap-2 items-center">
              <span className="text-sm text-gray-600">Ir directo a:</span>
              <button onClick={() => handleIrAPaso(0)} className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300">Paso 1</button>
              <button onClick={() => handleIrAPaso(1)} className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300">Paso 2</button>
              <button onClick={() => handleIrAPaso(2)} className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300">Paso 3</button>
              <button onClick={() => handleIrAPaso(3)} className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300">Paso 4</button>
            </div>
          </div>
        </div>

        {/* Información de uso */}
        <div className="max-w-4xl mx-auto mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-primary mb-2">💡 Opciones de uso:</h4>
          <ul className="text-sm text-primary space-y-1">
            <li>✅ <strong>Botones propios:</strong> Crea tus botones y usa stepperRef.current?.siguiente()</li>
            <li>✅ <strong>Botones del stepper:</strong> Usa &lt;StepNext&gt; y &lt;StepBack&gt;</li>
            <li>✅ <strong>Combinados:</strong> Mezcla ambos según necesites</li>
            <li>✅ <strong>Con validación:</strong> disabled={'{!isValid}'} en cualquier botón</li>
            <li>✅ <strong>Con callbacks:</strong> onClick en los botones del stepper</li>
          </ul>
        </div>
      </div>


    </>
  )
}


export function StepperVerticalPrueba() {
    const stepperRef = useRef<StepperVerticalRef>(null)

    // Funciones de control externo
    const handleSiguiente = () => {
        stepperRef.current?.siguiente()
    }

    const handleAnterior = () => {
        stepperRef.current?.anterior()
    }

    const handleIrAPaso = (paso: number) => {
        stepperRef.current?.irA(paso)
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        🏗️ Stepper Vertical
                    </h1>
                    <p className="text-xl text-gray-600">
                        Versión vertical inspirada en Material Tailwind
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    <StepperVertical
                        ref={stepperRef}
                        defaultStep={0}
                        onStepChange={(step) => console.log(`Cambió al paso: ${step + 1}`)}
                    >
                        {/* STEP 1 - Información Personal */}
                        <StepVertical title="Información Personal" description="Datos básicos del usuario">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                👤 paso 1
                            </h2>

                            <div className="flex justify-end gap-3 mt-8">
                                <StepNextVertical
                                    disabled={false}
                                    className="px-6 py-3"
                                >
                                    Continuar →
                                </StepNextVertical>
                            </div>
                        </StepVertical>

                        {/* STEP 2 - Información de Contacto */}
                        <StepVertical title="Información de Contacto" description="Email y datos de contacto">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                📧 Información de Contacto
                            </h2>


                            <div className="flex justify-between gap-3 mt-8">
                                <StepBackVertical className="px-6 py-3">
                                    ← Volver
                                </StepBackVertical>
                                <StepNextVertical
                                    disabled={false}
                                    className="px-6 py-3"
                                >
                                    Continuar →
                                </StepNextVertical>
                            </div>
                        </StepVertical>

                        {/* STEP 3 - Información Profesional */}
                        <StepVertical title="Información Profesional" description="Datos de trabajo y empresa">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                🏢 Información Profesional
                            </h2>


                            <div className="flex justify-between gap-3 mt-8">
                                <StepBackVertical className="px-6 py-3">
                                    ← Anterior
                                </StepBackVertical>
                                <StepNextVertical
                                    disabled={false}
                                    className="px-6 py-3"
                                >
                                    Continuar →
                                </StepNextVertical>
                            </div>
                        </StepVertical>

                        {/* STEP 4 - Confirmación */}
                        <StepVertical title="Confirmación" description="Revisar y confirmar información">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                ✅ Confirmación
                            </h2>
                            <div className="flex justify-between gap-3 mt-8">
                                <StepBackVertical className="px-6 py-3">
                                    ← Modificar datos
                                </StepBackVertical>
                                <StepNextVertical
                                    onClick={() => alert(`¡Proceso completado `)}
                                    className="px-8 py-3 bg-green-600 hover:bg-green-700"
                                >
                                    🚀 Finalizar Proceso
                                </StepNextVertical>
                            </div>
                        </StepVertical>
                    </StepperVertical>
                </div>

                {/* Controles externos */}
                <div className="max-w-6xl mx-auto mt-8">
                    <h3 className="text-lg font-semibold mb-4">🎮 Controles de Desarrollo</h3>
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => handleIrAPaso(0)}
                            className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm"
                        >
                            Ir a Paso 1
                        </button>
                        <button
                            onClick={() => handleIrAPaso(1)}
                            className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm"
                        >
                            Ir a Paso 2
                        </button>
                        <button
                            onClick={() => handleIrAPaso(2)}
                            className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm"
                        >
                            Ir a Paso 3
                        </button>
                        <button
                            onClick={() => handleIrAPaso(3)}
                            className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm"
                        >
                            Ir a Confirmación
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}


export default function StepperPague() {
  return <>
      <StepperHorizontalPrueba/>
      <StepperVerticalPrueba/>
  </>;
}
