import styled from 'styled-component'
import { useState } from "react";

// const StyledMenu = styled.nav<{ open: boolean }>`
//   top: 0;
//   left: 0;
//   height: 100vh;
//   width: 35vw;
//   position: fixed;
//   background-color: {colors.lightbrown};
//   z-index: 1;
//   padding: 10rem 0;
//   flex-direction: column;
//   display: ${({ open }) => (open ? "flex" : "none")};
// `;
// const StyledLink = styled.a`
//   padding: 0 2rem;
//   font-size: 2rem;
//   color: {colors.pearl};
//   text-decoration: none;
  
//   :hover {
//     color: {colors.yellowmellow};
//     cursor: pointer;
//   }
// `;
const Menu = () => {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <div>
      <StyledMenu open={open}>
        <StyledLink onClick={() => close()}>Link 1</StyledLink>
        <StyledLink onClick={() => close()}>Link 2</StyledLink>
        <StyledLink onClick={() => close()}>Link 3</StyledLink>
      </StyledMenu>
      <div open={open} setOpen={setOpen} />
     </div>
   );
};