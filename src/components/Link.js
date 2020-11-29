import React from "react";

const Link = ({ className, href, children }) => {
  
  const onClick = (event) => {
    if (event.metaKey || event.ctrlKey) {
      return;
    }

    event.preventDefault();
    
    // function to change the url of the page
    window.history.pushState({}, '', href);

    // code to tell to the components (route components) that the url has changed
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
  };

  return (
    <a onClick={onClick} className={className} href={href}>
      {children}
    </a>
  );
};

export default Link;
