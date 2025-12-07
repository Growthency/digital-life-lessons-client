import { useEffect } from "react";

const usePageTitle = (title) => {
  useEffect(() => {
    // টাইটেল সেট করা (Ex: Home | Digital Life)
    document.title = `${title} | Digital Life`;

    // পেজ চেঞ্জ হলে একদম উপরে নিয়ে যাওয়া (Scroll to Top) - এটা বোনাস ফিচার!
    window.scrollTo(0, 0);
  }, [title]);
};

export default usePageTitle;
