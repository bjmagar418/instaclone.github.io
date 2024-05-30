
/*solution for below problem which is removing JSON could solve the problme*/
import { create } from "zustand";

const initialUserData = localStorage.getItem("user-info");
console.log("Initial User Data from localStorage:", initialUserData);

let initialUser;
if (initialUserData && initialUserData !== "undefined") {
  initialUser = JSON.parse(initialUserData);
} else {
  initialUser = null;
}
console.log("Initial User:", initialUser);

const useAuthStore = create((set) => ({
  user: initialUser,
  login: (user) => {
    localStorage.setItem("user-info", JSON.stringify(user));
    set({ user });
  },
  logout: () => {
    localStorage.removeItem("user-info");
    set({ user: null });
  },
  setUser: (user) => set({ user }),
}));

export default useAuthStore;
/* REMOVING JSON CAN SOLVE THE PROBLEM
import { create } from "zustand";
const useAuthStore = create((set) => ({
	user: localStorage.getItem("user-info"),////// here removing json could solve the problem
	login: (user) => set({ user }),
	logout: () => set({ user: null }),
	setUser: (user) => set({ user }),
}));

export default useAuthStore;



/*import { create } from "zustand";   your actual code

const useAuthStore = create((set) => ({
	user: JSON.parse(localStorage.getItem("user-info")),//////// removeing jsins can solve the problem
	login: (user) => set({ user }),
	logout: () => set({ user: null }),
	setUser: (user) => set({ user }),
}));

export default useAuthStore;
*/

