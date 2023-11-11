const EyeIcon = ({ color = "#B39CF8", height = "25", width = "24" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.0799 11.9999C16.0799 13.9799 14.4799 15.5799 12.4999 15.5799C10.5199 15.5799 8.91992 13.9799 8.91992 11.9999C8.91992 10.0199 10.5199 8.41992 12.4999 8.41992C14.4799 8.41992 16.0799 10.0199 16.0799 11.9999Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.4998 20.2707C16.0298 20.2707 19.3198 18.1907 21.6098 14.5907C22.5098 13.1807 22.5098 10.8107 21.6098 9.4007C19.3198 5.8007 16.0298 3.7207 12.4998 3.7207C8.96984 3.7207 5.67984 5.8007 3.38984 9.4007C2.48984 10.8107 2.48984 13.1807 3.38984 14.5907C5.67984 18.1907 8.96984 20.2707 12.4998 20.2707Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default EyeIcon;
