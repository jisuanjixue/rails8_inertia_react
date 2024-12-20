// Input component extends from shadcnui - https://ui.shadcn.com/docs/components/input
import * as React from "react";
import { cn } from "@/lib/utils";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";
import {  useControllableValue, useSafeState } from "ahooks";
import { EyeOff, Eye, Check, X } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

  const InputWithPasswordStrengthIndicator = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, value, onChange, ...props }, ref) => {
      const radius = 100;
      const [visible, setVisible] = useSafeState(false);
      const [password, setPassword] = useControllableValue({value, onChange});
      const [isVisible, setIsVisible] = useSafeState<boolean>(false);
  
      let mouseX = useMotionValue(0);
      let mouseY = useMotionValue(0);
  
      function handleMouseMove({ currentTarget, clientX, clientY }: any) {
        let { left, top } = currentTarget.getBoundingClientRect();
  
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
      }
  
      const toggleVisibility = () => setIsVisible((prevState) => !prevState);
  
      const checkStrength = (pass: string) => {
        const requirements = [
          { regex: /.{8,}/, text: "至少8个字符" },
          { regex: /[0-9]/, text: "至少1个数字" },
          { regex: /[a-z]/, text: "至少1个小写字母" },
          { regex: /[A-Z]/, text: "至少1个大写字母" },
        ];
  
        return requirements.map((req) => ({
          met: req.regex.test(pass),
          text: req.text,
        }));
      };
  
      const strength = checkStrength(password);
  
      const strengthScore = React.useMemo(() => {
        return strength.filter((req) => req.met).length;
      }, [strength]);
  
      const getStrengthColor = (score: number) => {
        if (score === 0) return "bg-border";
        if (score <= 1) return "bg-red-500";
        if (score <= 2) return "bg-orange-500";
        if (score === 3) return "bg-amber-500";
        return "bg-emerald-500";
      };
  
      const getStrengthText = (score: number) => {
        if (score === 0) return "密码";
        if (score <= 2) return "弱密码";
        if (score === 3) return "中等密码";
        return "强密码";
      };
  
      return (
        <div className="w-[300px]">
          <motion.div
            style={{
              background: useMotionTemplate`
            radial-gradient(
              ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
              var(--blue-500),
              transparent 80%
            )
          `,
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            className="p-[2px] rounded-lg transition duration-300 group/input"
          >
            <div className="relative">
              <input
                type={isVisible ? "text" : type}
                className={cn(
                  `flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent 
                file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 
                focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
                 disabled:cursor-not-allowed disabled:opacity-50
                 dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
                 group-hover/input:shadow-none transition duration-400
                 `,
                  className
                )}
                ref={ref}
                {...props}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={strengthScore < 4}
                aria-describedby="password-strength"
              />
              {type === "password" && (
                <button
                  className="absolute inset-y-0 flex items-center justify-center h-full transition-colors end-0 w-9 rounded-e-lg text-muted-foreground/80 outline-offset-2 hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                  type="button"
                  onClick={toggleVisibility}
                  aria-label={isVisible ? "Hide password" : "Show password"}
                  aria-pressed={isVisible}
                  aria-controls="password"
                >
                  {isVisible ? (
                    <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
                  ) : (
                    <Eye size={16} strokeWidth={2} aria-hidden="true" />
                  )}
                </button>
              )}
            </div>
          </motion.div>
  
          {(type === "password" && props.name === "password") && (
            <>
              <div
                className="w-full h-1 mt-3 mb-4 overflow-hidden rounded-full bg-border"
                role="progressbar"
                aria-valuenow={strengthScore}
                aria-valuemin={0}
                aria-valuemax={4}
                aria-label="Password strength"
              >
                <div
                  className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`}
                  style={{ width: `${(strengthScore / 4) * 100}%` }}
                ></div>
              </div>
  
              <p id="password-strength" className="mb-2 text-sm font-medium text-foreground">
                {getStrengthText(strengthScore)}. 必须包含:
              </p>
  
              <ul className="space-y-1.5" aria-label="Password requirements">
                {strength.map((req, index) => (
                  <li key={index} className="flex items-center gap-2">
                    {req.met ? (
                      <Check size={16} className="text-emerald-500" aria-hidden="true" />
                    ) : (
                      <X size={16} className="text-muted-foreground/80" aria-hidden="true" />
                    )}
                    <span className={`text-xs ${req.met ? "text-emerald-600" : "text-muted-foreground"}`}>
                      {req.text}
                      <span className="sr-only">
                        {req.met ? " - Requirement met" : " - Requirement not met"}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      );
    }
  );
  
  InputWithPasswordStrengthIndicator.displayName = "InputWithPasswordStrengthIndicator";
  
  export { InputWithPasswordStrengthIndicator };
