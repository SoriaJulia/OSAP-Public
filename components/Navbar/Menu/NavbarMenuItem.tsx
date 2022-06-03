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
      className="flex justify-end gap-1 rounded-3xl py-3 px-1 text-lg underline-offset-1 hover:text-white hover:underline md:text-xl "
      onClick={onClick}
    >
      {text}
      {icon}
    </button>
  );
};

export default NavbarMenuItem;
