//https://www.material-tailwind.com/docs/react/stepper
import * as React from "react"
import { Check, CheckCheckIcon, CheckIcon, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// Context para comunicar entre Stepper y sus hijos
const StepperContext = React.createContext({
  currentStep: 0,
  totalSteps: 0,
  siguiente: () => { },
  anterior: () => { },
  irA: (step: number) => { },
  isFirstStep: false,
  isLastStep: false,
})

// Hook para usar el context
export const useStepper = () => {
  const context = React.useContext(StepperContext)
  if (!context) {
    throw new Error('useStepper must be used within a Stepper')
  }
  return context
}

// Componente visual del step en el header
const StepIndicator: React.FC<{
  title: string
  index: number
  description?: string
  isCompleted?: boolean
  isActive?: boolean
}> = ({ title, index, description, isCompleted, isActive }) => {
  return (
    <div className="flex items-center">
      <div className="relative flex items-center justify-center">
        <div
          className={cn(
            "w-10 h-10 rounded-full border-2 flex items-center justify-center",
            isCompleted
              ? "border-primary bg-primary text-primary-foreground"
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
            <span className="text-md font-medium">{index + 1}</span>
          )}
        </div>
      </div>
      <div className="ml-4">
        <p
          className={cn(
            "text-sm font-medium",
            isActive || isCompleted ? "text-foreground" : "text-muted-foreground"
          )}
        >
          {title}
        </p>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  )
}


// Componente Step individual
interface StepProps {
  title?: string
  description?: string
  children: React.ReactNode
}

export function Step({ title, description, children }: StepProps) {
  return <div>{children}</div>
}

// Componente StepNext por defecto
interface StepNextProps {
  children?: React.ReactNode
  onClick?: () => void | Promise<void>
  disabled?: boolean
  className?: string
}

export function StepNext({ children = "Siguiente →", onClick, disabled = false, className }: StepNextProps) {
  const { siguiente, isLastStep } = useStepper()

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
      className={className}
    >
      {isLastStep ? "Finalizar" : children}
    </Button>
  )
}

// Componente StepBack por defecto
interface StepBackProps {
  children?: React.ReactNode
  onClick?: () => void | Promise<void>
  disabled?: boolean
  className?: string
}

export function StepBack({ children = "← Anterior", onClick, disabled = false, className }: StepBackProps) {
  const { anterior, isFirstStep } = useStepper()

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
      className={className}
    >
      {children}
    </Button>
  )
}

// Interface para el ref
export interface StepperRef {
  siguiente: () => void
  anterior: () => void
  irA: (step: number) => void
  stepActual: number
  totalSteps: number
}

// Props del Stepper
interface StepperProps {
  children: React.ReactNode
  defaultStep?: number
  onStepChange?: (step: number) => void
  className?: string
}

// Componente principal Stepper con ref para control externo
export const Stepper = React.forwardRef<StepperRef, StepperProps>(
  ({ children, defaultStep = 0, onStepChange, className }, ref) => {
    const [currentStep, setCurrentStep] = React.useState(defaultStep)

    // Obtener información de los steps de los children
    const steps = React.Children.toArray(children).filter(
      (child): child is React.ReactElement<StepProps> => {
        return React.isValidElement(child) && child.type === Step
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
      <StepperContext.Provider value={contextValue}>
        <div className={cn("w-full", className)}>
          {/* Header con indicadores de steps */}
          <div className="flex justify-between items-center mb-8 overflow-x-auto">
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                <StepIndicator
                  index={index}
                  title={step.props.title}
                  description={step.props.description}
                  isCompleted={index < currentStep}
                  isActive={index === currentStep}
                />
                {index < steps.length - 1 && (
                  <ChevronRight className="text-muted-foreground mx-2" />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Contenido del step actual */}
          <div>
            {steps[currentStep]}
          </div>
        </div>
      </StepperContext.Provider>
    )
  }
)

Stepper.displayName = "Stepper"