import React, { useRef, useState } from "react"
import { StepperVertical, StepVertical, StepNextVertical, StepBackVertical, type StepperVerticalRef } from "@/components/ui/StepperVertical"

// Componentes básicos para el ejemplo
const Input = ({ ...props }) => (
    <input
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        {...props}
    />
)

const Label = ({ children, ...props }) => (
    <label className="block text-sm font-medium text-gray-700 mb-2" {...props}>
        {children}
    </label>
)

const Card = ({ children, className = "" }) => (
    <div className={`bg-white rounded-lg border shadow-sm ${className}`}>
        {children}
    </div>
)

function Vertical() {
    const stepperRef = useRef<StepperVerticalRef>(null)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        address: ""
    })

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

    // Validaciones
    const isStep1Valid = formData.name.trim() !== ""
    const isStep2Valid = formData.email.includes("@")
    const isStep3Valid = formData.company.trim() !== ""

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
                            <Card className="p-8">
                                <div className="mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                        👤 Información Personal
                                    </h2>
                                    <p className="text-gray-600">
                                        Completa tus datos personales para continuar
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <Label htmlFor="name">Nombre completo *</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="Ingresa tu nombre completo"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="age">Edad</Label>
                                        <Input
                                            id="age"
                                            type="number"
                                            placeholder="Tu edad"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="phone">Teléfono</Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            placeholder="+1 (555) 123-4567"
                                        />
                                    </div>

                                    <div className={`p-4 rounded-lg ${isStep1Valid ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}>
                                        <p className={`text-sm ${isStep1Valid ? 'text-green-700' : 'text-amber-700'}`}>
                                            {isStep1Valid ? '✅ ¡Perfecto! Puedes continuar' : '⚠️ Por favor completa tu nombre'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 mt-8">
                                    <StepNextVertical
                                        disabled={!isStep1Valid}
                                        className="px-6 py-3"
                                    >
                                        Continuar →
                                    </StepNextVertical>
                                </div>
                            </Card>
                        </StepVertical>

                        {/* STEP 2 - Información de Contacto */}
                        <StepVertical title="Información de Contacto" description="Email y datos de contacto">
                            <Card className="p-8">
                                <div className="mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                        📧 Información de Contacto
                                    </h2>
                                    <p className="text-gray-600">
                                        Proporciona tu información de contacto
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <Label htmlFor="email">Correo electrónico *</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="tu@correo.com"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="website">Sitio web (opcional)</Label>
                                        <Input
                                            id="website"
                                            type="url"
                                            placeholder="https://tusitio.com"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="linkedin">LinkedIn (opcional)</Label>
                                        <Input
                                            id="linkedin"
                                            type="url"
                                            placeholder="https://linkedin.com/in/tuperfil"
                                        />
                                    </div>

                                    <div className={`p-4 rounded-lg ${isStep2Valid ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}>
                                        <p className={`text-sm ${isStep2Valid ? 'text-green-700' : 'text-amber-700'}`}>
                                            {isStep2Valid ? '✅ Email válido' : '⚠️ Ingresa un email válido'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex justify-between gap-3 mt-8">
                                    <StepBackVertical className="px-6 py-3">
                                        ← Volver
                                    </StepBackVertical>
                                    <StepNextVertical
                                        disabled={!isStep2Valid}
                                        className="px-6 py-3"
                                    >
                                        Continuar →
                                    </StepNextVertical>
                                </div>
                            </Card>
                        </StepVertical>

                        {/* STEP 3 - Información Profesional */}
                        <StepVertical title="Información Profesional" description="Datos de trabajo y empresa">
                            <Card className="p-8">
                                <div className="mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                        🏢 Información Profesional
                                    </h2>
                                    <p className="text-gray-600">
                                        Cuéntanos sobre tu trabajo actual
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <Label htmlFor="company">Empresa *</Label>
                                        <Input
                                            id="company"
                                            type="text"
                                            value={formData.company}
                                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                            placeholder="Nombre de tu empresa"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="position">Cargo</Label>
                                        <Input
                                            id="position"
                                            type="text"
                                            placeholder="Tu posición actual"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="experience">Años de experiencia</Label>
                                        <Input
                                            id="experience"
                                            type="number"
                                            placeholder="Años de experiencia"
                                        />
                                    </div>

                                    <div className={`p-4 rounded-lg ${isStep3Valid ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}>
                                        <p className={`text-sm ${isStep3Valid ? 'text-green-700' : 'text-amber-700'}`}>
                                            {isStep3Valid ? '✅ Información profesional completa' : '⚠️ Por favor ingresa el nombre de tu empresa'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex justify-between gap-3 mt-8">
                                    <StepBackVertical className="px-6 py-3">
                                        ← Anterior
                                    </StepBackVertical>
                                    <StepNextVertical
                                        disabled={!isStep3Valid}
                                        className="px-6 py-3"
                                    >
                                        Continuar →
                                    </StepNextVertical>
                                </div>
                            </Card>
                        </StepVertical>

                        {/* STEP 4 - Confirmación */}
                        <StepVertical title="Confirmación" description="Revisar y confirmar información">
                            <Card className="p-8">
                                <div className="mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                        ✅ Confirmación
                                    </h2>
                                    <p className="text-gray-600">
                                        Revisa tu información antes de finalizar
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-gray-50 p-6 rounded-lg">
                                        <h3 className="font-semibold text-gray-900 mb-4">📋 Resumen de información:</h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <span className="font-medium text-gray-700">Nombre:</span>
                                                <span className="ml-2 text-gray-900">{formData.name || "No completado"}</span>
                                            </div>
                                            <div>
                                                <span className="font-medium text-gray-700">Email:</span>
                                                <span className="ml-2 text-gray-900">{formData.email || "No completado"}</span>
                                            </div>
                                            <div>
                                                <span className="font-medium text-gray-700">Empresa:</span>
                                                <span className="ml-2 text-gray-900">{formData.company || "No completado"}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                                        <p className="text-sm text-green-700">
                                            🎉 ¡Excelente! Tu información está lista para ser procesada.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex justify-between gap-3 mt-8">
                                    <StepBackVertical className="px-6 py-3">
                                        ← Modificar datos
                                    </StepBackVertical>
                                    <StepNextVertical
                                        onClick={() => alert(`¡Proceso completado!\nDatos: ${JSON.stringify(formData, null, 2)}`)}
                                        className="px-8 py-3 bg-green-600 hover:bg-green-700"
                                    >
                                        🚀 Finalizar Proceso
                                    </StepNextVertical>
                                </div>
                            </Card>
                        </StepVertical>
                    </StepperVertical>
                </div>

                {/* Controles externos */}
                <div className="max-w-6xl mx-auto mt-8">
                    <Card className="p-6">
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
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Vertical