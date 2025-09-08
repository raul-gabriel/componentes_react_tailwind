"use client"
import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// Context para comunicar entre Stepper y sus hijos
const StepperVerticalContext = React.createContext({
  currentStep: 0,
  totalSteps: 0,
  siguiente: () => {},
  anterior: () => {},
  irA: (step: number) => {},
  isFirstStep: false,
  isLastStep: false,
})

// Hook para usar el context
export const useStepperVertical = () => {
  const context = React.useContext(StepperVerticalContext)
  if (!context) {
    throw new Error('useStepperVertical must be used within a StepperVertical')
  }
  return context
}

// Componente visual del step en la barra lateral
const StepIndicatorVertical: React.FC<{
  title: string
  index: number
  description?: string
  isCompleted?: boolean
  isActive?: boolean
  isLast?: boolean
}> = ({ title, index, description, isCompleted, isActive, isLast }) => {
  return (
    <div className="flex relative">
      {/* Línea vertical */}
      {!isLast && (
        <div 
          className={cn(
            "absolute left-4 top-8 w-0.5 h-16",
            isCompleted || isActive 
              ? "bg-primary" 
              : "bg-gray-200"
          )}
        />
      )}
      
      {/* Círculo del step */}
      <div className="relative flex items-start">
        <div
          className={cn(
            "w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0",
            isCompleted
              ? "border-primary bg-primary text-white"
              : isActive
                ? "border-primary bg-primary text-white"
                : "border-gray-300 bg-white text-gray-500",
          )}
        >
          {isCompleted ? (
           <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-white" // el color lo controlas aquí
              viewBox="0 0 8 8"
              fill="currentColor"
            >
              <path d="M3 7L0 4l1-1l2 2l4-4l1 1" />
            </svg>
          ) : (
            <span className="text-sm font-medium">{index + 1}</span>
          )}
        </div>
        
        {/* Contenido del step */}
        <div className="ml-4 pb-8">
          <p
            className={cn(
              "text-sm font-medium leading-tight",
              isActive || isCompleted ? "text-gray-900" : "text-gray-500"
            )}
          >
            {title}
          </p>
          {description && (
            <p className={cn(
              "text-xs mt-1", 
              isActive || isCompleted ? "text-gray-600" : "text-gray-400"
            )}>
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

// Componente Step individual para vertical
interface StepVerticalProps {
  title: string
  description?: string
  children: React.ReactNode
}

export function StepVertical({ title, description, children }: StepVerticalProps) {
  return <div>{children}</div>
}

// Componente StepNext para vertical
interface StepNextVerticalProps {
  children?: React.ReactNode
  onClick?: () => void | Promise<void>
  disabled?: boolean
  className?: string
}

export function StepNextVertical({ children = "Siguiente", onClick, disabled = false, className }: StepNextVerticalProps) {
  const { siguiente, isLastStep } = useStepperVertical()
  
  const handleClick = async () => {
    if (onClick) {
      await onClick()
    }
    if (!disabled) {
      siguiente()
    }
  }

  return (
    <Button
      onClick={handleClick}
      disabled={disabled}
      className={cn("bg-primary hover:bg-primary/90", className)}
    >
      {isLastStep ? "Finalizar" : children}
    </Button>
  )
}

// Componente StepBack para vertical
interface StepBackVerticalProps {
  children?: React.ReactNode
  onClick?: () => void | Promise<void>
  disabled?: boolean
  className?: string
}

export function StepBackVertical({ children = "Anterior", onClick, disabled = false, className }: StepBackVerticalProps) {
  const { anterior, isFirstStep } = useStepperVertical()
  
  const handleClick = async () => {
    if (onClick) {
      await onClick()
    }
    if (!disabled) {
      anterior()
    }
  }

  return (
    <Button
      variant="outline"
      onClick={handleClick}
      disabled={disabled || isFirstStep}
      className={cn("border-primary text-primary hover:bg-primary/10", className)}
    >
      {children}
    </Button>
  )
}

// Interface para el ref vertical
export interface StepperVerticalRef {
  siguiente: () => void
  anterior: () => void
  irA: (step: number) => void
  stepActual: number
  totalSteps: number
}

// Props del StepperVertical
interface StepperVerticalProps {
  children: React.ReactNode
  defaultStep?: number
  onStepChange?: (step: number) => void
  className?: string
}

// Componente principal StepperVertical
export const StepperVertical = React.forwardRef<StepperVerticalRef, StepperVerticalProps>(
  ({ children, defaultStep = 0, onStepChange, className }, ref) => {
    const [currentStep, setCurrentStep] = React.useState(defaultStep)
    
    // Obtener información de los steps de los children
    const steps = React.Children.toArray(children).filter(
      (child): child is React.ReactElement<StepVerticalProps> => {
        return React.isValidElement(child) && child.type === StepVertical
      }
    )
    
    const totalSteps = steps.length
    const isFirstStep = currentStep === 0
    const isLastStep = currentStep === totalSteps - 1

    const siguiente = React.useCallback(() => {
      if (currentStep < totalSteps - 1) {
        const newStep = currentStep + 1
        setCurrentStep(newStep)
        onStepChange?.(newStep)
      }
    }, [currentStep, totalSteps, onStepChange])

    const anterior = React.useCallback(() => {
      if (currentStep > 0) {
        const newStep = currentStep - 1
        setCurrentStep(newStep)
        onStepChange?.(newStep)
      }
    }, [currentStep, onStepChange])

    const irA = React.useCallback((step: number) => {
      if (step >= 0 && step < totalSteps) {
        setCurrentStep(step)
        onStepChange?.(step)
      }
    }, [totalSteps, onStepChange])

    // Context value
    const contextValue = React.useMemo(() => ({
      currentStep,
      totalSteps,
      siguiente,
      anterior,
      irA,
      isFirstStep,
      isLastStep,
    }), [currentStep, totalSteps, siguiente, anterior, irA, isFirstStep, isLastStep])

    // Exponer métodos via ref
    React.useImperativeHandle(ref, () => ({
      siguiente,
      anterior,
      irA,
      stepActual: currentStep,
      totalSteps
    }), [siguiente, anterior, irA, currentStep, totalSteps])

    return (
      <StepperVerticalContext.Provider value={contextValue}>
        <div className={cn("flex gap-8", className)}>
          {/* Sidebar con los steps */}
          <div className="flex-shrink-0 w-64">
            <div className="space-y-0">
              {steps.map((step, index) => (
                <StepIndicatorVertical
                  key={index}
                  index={index}
                  title={step.props.title}
                  description={step.props.description}
                  isCompleted={index < currentStep}
                  isActive={index === currentStep}
                  isLast={index === steps.length - 1}
                />
              ))}
            </div>
          </div>

          {/* Contenido del step actual */}
          <div className="flex-1 min-h-[400px]">
            {steps[currentStep]}
          </div>
        </div>
      </StepperVerticalContext.Provider>
    )
  }
)

StepperVertical.displayName = "StepperVertical"