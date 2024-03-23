import { lato } from '@/app/_utils/fonts';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Link } from '@/app/_lib/i18nNavigation';

export const IconTypes = {
  ARROW_RIGHT: 'ARROW_RIGHT',
};

const BlogButton = (props) => {
  if (props.href) {
    return (
      <Link
        className={`blog_button hover:bg-[#1442cb] w-full flex-1 justify-center ${lato.className}`}
        href={props.href}
      >
        {props.children}
        <BlogButton.Icon iconType={props.icon} />
      </Link>
    );
  }

  return (
    <button className={`blog_button hover:bg-[#1442cb] ${lato.className}`}>
      {props.children}
    </button>
  );
};

// eslint-disable-next-line react/display-name
BlogButton.Icon = ({ iconType }) => {
  if (iconType === 'ARROW_RIGHT') {
    return (
      <ArrowRightIcon aria-hidden="true" fill={'white'} className="h-5 w-5" />
    );
  }
};

export default BlogButton;
