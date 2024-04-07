import Image from 'next/image';
import ConditionalRenderer from '../../_utils/conditional-renderer';
import BlogButton from '@/app/[locale]/blog/_components/Button/Button';
import Link from 'next/link';
import { format } from 'date-fns';

export const BlogCard = (props) => (
  /* Blog card */
  <div
    className="
      hover:scale-[1.02] duration-200
      border border-gray-800
      blog_shadow h-[calc(100%-30px)] flex flex-col mb-8 gap-[30px] overflow-hidden rounded-xl 
      @2xl:h-auto @2xl:flex-row"
  >
    {/* Blog card image container */}
    <Link
      href={props.href}
      className="
        relative w-full aspect-video
        @2xl:flex-1"
    >
      <Image
        className="object-cover min-h-full"
        src={props.imageSrc}
        alt={props.imageAlt}
        fill={true}
      />
    </Link>

    {/* Blog card text container */}
    <div
      className="
        flex flex-1 flex-col justify-items-start p-5 pt-0
        @2xl:justify-center @2xl:pl-0"
    >
      {/* Small category label section, pre-defined colors from CMS enum list */}
      <ConditionalRenderer condition={props.label}>
        <div
          className={`
            rounded-full py-1.5 px-3 bg-teal-900/20 w-fit
            mb-2.5 blog_text_c_orange font-semibold
            blog_text_c_${props.color}`}
        >
          {props.label}
        </div>
      </ConditionalRenderer>

      {/* Title */}
      <ConditionalRenderer condition={props.title}>
        <Link href={props.href} className="text-3xl mb-3 font-bold">
          {props.title}
        </Link>
      </ConditionalRenderer>

      <div className="flex flex-row gap-x-2 mb-3 text-sm text-gray-400 justify-start">
        <span>
          {format(Date.parse(props.publishedAt), 'MMMM dd')}
          <span className="text-sm font-normal text-gray-400">
            {', '}
            {props.minutesToRead} {'min read'}
          </span>
        </span>

        <span className="text-gray-200/80 italic">
          {' · '}
          {props.authorName}
        </span>
      </div>

      {/* Summary */}
      <ConditionalRenderer condition={props.summary}>
        <p className="font-semibold text-base mb-5">{props.summary}</p>
      </ConditionalRenderer>

      {/* Read More button */}
      <ConditionalRenderer condition={props.href}>
        <span
          className="
            h-full flex items-end w-[160px] pb-1 @2xl:pb-0
            @2xl:h-auto"
        >
          <BlogButton href={props.href} icon={props.btnIcon}>
            {props.btnLabel || 'Read More'}
          </BlogButton>
        </span>
      </ConditionalRenderer>
    </div>
  </div>
);
