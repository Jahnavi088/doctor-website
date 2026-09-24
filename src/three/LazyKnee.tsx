import {
  lazy,
  Suspense,
  useEffect,
  useState,
  type MutableRefObject,
} from "react";
import { useInView, useReducedMotion } from "../hooks/useReveal";
import { KneeLineDrawing } from "../components/ui/Glyphs";
import { supportsWebGL } from "./webgl";
import type { KneeVariant } from "./KneeScene";
import type { KneeMode } from "../data/site";
import "./knee.css";

const KneeScene = lazy(() => import("./KneeScene"));
const HeroKneeScene = lazy(() => import("./HeroKneeScene"));

type Props = {
  variant: KneeVariant;
  mode?: KneeMode;
  /** When false only the fine-line drawing is shown (e.g. hero on small screens). */
  enabled?: boolean;
  userYaw?: MutableRefObject<number>;
  /** hero only: smaller knee + fewer particles for phones */
  compact?: boolean;
  className?: string;
};

/**
 * Renders the fine-line knee drawing immediately, then — once the block is near the
 * viewport and the browser is idle — loads the WebGL scene and cross-fades to it.
 */
export function LazyKnee({
  variant,
  mode,
  enabled = true,
  userYaw,
  compact = false,
  className = "",
}: Props) {
  const [ref, inView] = useInView<HTMLDivElement>("300px");
  const reducedMotion = useReducedMotion();
  const [mount, setMount] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!enabled || !inView || mount || !supportsWebGL()) return;
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
    };
    const go = () => setMount(true);
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(go, { timeout: 1200 });
      return () =>
        (
          window as Window & { cancelIdleCallback?: (id: number) => void }
        ).cancelIdleCallback?.(id);
    }
    const t = window.setTimeout(go, 300);
    return () => clearTimeout(t);
  }, [enabled, inView, mount]);

  const show3d = enabled && mount;
  return (
    <div
      ref={ref}
      className={`knee knee--${variant} ${ready && show3d ? "is-ready" : ""} ${className}`}
    >
      <KneeLineDrawing className="knee__drawing" />
      {show3d && (
        <div className="knee__canvas">
          <Suspense fallback={null}>
            {variant === "hero" ? (
              <HeroKneeScene
                reducedMotion={reducedMotion}
                active={inView}
                compact={compact}
                onReady={() => setReady(true)}
              />
            ) : (
              <KneeScene
                variant={variant}
                mode={mode}
                reducedMotion={reducedMotion}
                active={inView}
                userYaw={userYaw}
                onReady={() => setReady(true)}
              />
            )}
          </Suspense>
        </div>
      )}
    </div>
  );
}
