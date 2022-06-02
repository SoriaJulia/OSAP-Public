interface NavbarMenuItem {
  text: string;
  icon?: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

// const onEnterKeyDown = (cb) => (e) => {
//   if (e.key === 'enter') {
//     cb(e);
//   }
// };

const NavbarMenuItem: React.FC<NavbarMenuItem> = ({ text, icon, onClick }) => {
  // const onKeyDownHandler = (e) => {
  //   // onClick();
  // };

  // onKeyDown={onEnterKeyDown(onKeyDownHandler)}
  return (
    <button
      className="flex justify-center gap-1 rounded-3xl py-3 px-2 text-xl hover:bg-blue-200/50 hover:text-blue-900"
      onClick={onClick}
    >
      {text}
      {icon}
    </button>
  );
};

export default NavbarMenuItem;
