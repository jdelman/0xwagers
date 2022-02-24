import {NavLink} from 'remix';

export default function Header() {
  return (
    <header>
      <h2>0xwagers</h2>
      <h3>menu</h3>
      <ul>
        <li><NavLink to="mine">my wagers</NavLink></li>
        <li><NavLink to="all">all wagers</NavLink></li>
        <li><NavLink to="create">create</NavLink></li>
        <li><NavLink to="about">about</NavLink></li>
        <li>connect wallet</li>
      </ul>
    </header>
  );
}