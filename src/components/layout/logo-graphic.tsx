export function LogoGraphic({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="600"
      height="100"
      viewBox="0 0 600 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');
        `}
      </style>
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontFamily="'Playfair Display', serif"
        fontSize="32"
        fontWeight="bold"
        fill="hsl(195, 100%, 90%)"
        letterSpacing="0.1em"
      >
        UNITED LAPA NATIONS
      </text>
    </svg>
  );
}
