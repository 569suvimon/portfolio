// import { useRouter } from "next/navigation";
// import { Dropdown } from "@/components/feature"

// const options = [
//     {
//       icon: null,
//       label: "Create Event",
//       value: "create",
//     },
//     {
//       icon: null,
//       label: "My Profile",
//       value: "profile",
//     },
//     {
//       icon: null,
//       label: "Signout",
//       value: "signout",
//     },
//   ];

// const SignInDropdown = () => {
//     const router = useRouter();
//     return (
//         <div className="space-x-2 flex flex-row items-center">
//             <Dropdown
//                 placeholder={"Username"}
//                 submenus={options}
//                 onSelected={() => {
//                 if (e.target.dataset.name === "signout") {
//                     dispatch(signOutUser());
//                     router.push("/");
//                 }
//                 e.target.dataset.name === "profile" && router.push("/profile");
//                 e.target.dataset.name === "create" && router.push("/events/manage");
//                 }}
//             />
//         </div>
//     )
// }

// export default SignInDropdown;

"use client";

import { useRouter } from "next/navigation";
import { Dropdown } from "@/components/feature";

const options = [
  {
    label: "Create Event",
    value: "create",
  },
  {
    label: "My Profile",
    value: "profile",
  },
  {
    label: "Sign Out",
    value: "signout",
  },
];

export default function SignInDropdown() {
  const router = useRouter();

  const handleSelect = (value: string) => {
    switch (value) {
      case "create":
        router.push("/events/manage");
        break;

      case "profile":
        router.push("/profile");
        break;

      case "signout":
        // dispatch(signOutUser());
        router.push("/");
        break;
    }
  };

  return (
    <Dropdown
      placeholder="Username"
      items={options}
      onSelect={handleSelect}
    />
  );
}