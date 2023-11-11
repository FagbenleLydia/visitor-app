const ArrowDownIcon = ({ color = "white", height = "24", width = "24" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 8L12.0071 15.9929C12.0032 15.9968 11.9968 15.9968 11.9929 15.9929L4 8"
        stroke={color}
        strokeWidth="2"
      />
    </svg>
  );
};

export default ArrowDownIcon;
