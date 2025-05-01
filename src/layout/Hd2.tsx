import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

//Tailwind는 실제로 사용된 클래스만 빌드 시 포함
//퍼포먼스 향상에 유리
//→ 디자이너의 시안에 정확히 맞추기 쉬움
//Figma → Tailwind 전환이 직관적 (px, 색상, spacing 그대로 매핑 가능)
// bg-*
//   bg-red-500
// bg-blue-200
// bg-green-700
// bg-gray-50
// bg-black
// bg-white

  const menus = [
    { name: "Menu1", sub: ["Sub1-1", "Sub1-2", "Sub1-3"] },
    { name: "Menu2", sub: ["Sub2-1", "Sub2-2", "Sub2-3"] },
    { name: "Menu3", sub: ["Sub3-1", "Sub3-2", "Sub3-3"] },
    { name: "Menu4", sub: ["Sub4-1", "Sub4-2", "Sub4-3"] },
  ];

  const utils = [
    { name: "Facebook", href: "#fb" },
    { name: "Twitter", href: "#tw" },
    { name: "Instagram", href: "#ig" },
  ];

  return (
    <header className="border-b  hover:shadow-md  bg-white fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo or Mobile Menu Button */}
        <div className="lg:hidden">
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Center Main Menu */}
        <nav className="hidden lg:flex space-x-8">
          {menus.map((menu, idx) => (
            <Menu key={idx} as="div" className="relative">
              <MenuButton className="text-gray-700 font-medium hover:text-blue-500">
                {menu.name}
              </MenuButton>
              <MenuItems className="absolute mt-2 bg-white border shadow-lg rounded py-1 z-10">
                {menu.sub.map((sub, i) => (
                  <MenuItem key={i}>
                    {({ active }) => (
                      <Link
                        to={`/${menu.name.toLowerCase()}/${sub.toLowerCase()}`}
                        className={`block px-4 py-2 text-sm ${
                          active ? "bg-blue-100" : ""
                        }`}
                      >
                        {sub}
                      </Link>
                    )}
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>
          ))}
        </nav>

        {/* Right Utility Menu */}
        <div className="hidden lg:flex space-x-4">
          {utils.map((item, idx) => (
            <Link key={idx} to={item.href} className="text-sm text-gray-600 hover:text-blue-500">
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t shadow-md ">
          <nav className="flex flex-col p-4 space-y-4">
            {menus.map((menu, idx) => (
              <div key={idx}>
                <p className="font-medium">{menu.name}</p>
                <div className="pl-4 space-y-1">
                  {menu.sub.map((sub, i) => (
                    <Link
                      key={i}
                      to={`/${menu.name.toLowerCase()}/${sub.toLowerCase()}`}
                      className="text-sm text-gray-600 hover:text-blue-600"
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <div className="pt-4 border-t">
              {utils.map((item, idx) => (
                <Link key={idx} to={item.href} className="text-sm text-gray-600 hover:text-blue-500 block">
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
