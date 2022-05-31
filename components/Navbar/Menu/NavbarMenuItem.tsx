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
    <button className="flex w-full gap-2 bg-blue-50 py-3 px-4 hover:bg-slate-50" onClick={onClick}>
      {text}
      {icon}
    </button>
  );
};

export default NavbarMenuItem;
