interface Props extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const defaultSvgProps: React.SVGProps<SVGSVGElement> = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const defaultPathProps: React.SVGProps<SVGPathElement> = {
  stroke: 'none',
  d: "M0 0h24v24H0z",
  fill: 'none'
}

const Cross = ({ className, ...props }: Props) => {
  return <svg className={className} {...defaultSvgProps} {...props}><path {...defaultPathProps} />

    <path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
}

const Plus = ({ className, ...props }: Props) => {
  return <svg className={className} {...defaultSvgProps} {...props}><path {...defaultPathProps} />

    <path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
}

const Minus = ({ className, ...props }: Props) => {
  return <svg className={className} {...defaultSvgProps} {...props}><path {...defaultPathProps} />

    <path d="M5 12l14 0" /></svg>
}

const Instagram = ({ className, ...props }: Props) => {
  return <svg className={className} {...defaultSvgProps} {...props}><path {...defaultPathProps} />

    <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" /><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M16.5 7.5l0 .01" /></svg>
}

const X = ({ className, ...props }: Props) => {
  return <svg className={className} {...defaultSvgProps} {...props}><path {...defaultPathProps} />

    <path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
}

const Tiktok = ({ className, ...props }: Props) => {
  return <svg className={className} {...defaultSvgProps} {...props}><path {...defaultPathProps} />

    <path d="M21 7.917v4.034a9.948 9.948 0 0 1 -5 -1.951v4.5a6.5 6.5 0 1 1 -8 -6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.005 6.005 0 0 0 4.917 4.917z" /></svg>
}

const Cart = ({ className, ...props }: Props) => {
  return <svg className={className} {...defaultSvgProps} {...props}><path {...defaultPathProps} />

    <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 17h-11v-14h-2" /><path d="M6 5l14 1l-1 7h-13" /></svg>
}
const CartAdd = ({ className, ...props }: Props) => {
  return <svg className={className} {...defaultSvgProps} {...props}><path {...defaultPathProps} />

    <path d="M12.5 17h-6.5v-14h-2" /><path d="M6 5l14 1l-.86 6.017m-2.64 .983h-10.5" /><path d="M16 19h6" /><path d="M19 16v6" /></svg>
}
const ArrowRight = ({ className, ...props }: Props) => {
  return <svg className={className} {...defaultSvgProps} {...props}><path {...defaultPathProps} />

<path d="M5 12l14 0" /><path d="M13 18l6 -6" /><path d="M13 6l6 6" /></svg>
}

export const Icon = { Cross, Plus, Minus, Cart, CartAdd, Instagram, X, Tiktok, ArrowRight }

