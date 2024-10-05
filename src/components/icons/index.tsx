import { cn } from "@/lib/utils";

type Props = {
    size?: number;
    className?: string;
};

export const HomeIcon = ({ size, className }: Props) => {
    return (
        <svg data-2hw="true" data-qa="home" aria-hidden="true" viewBox="0 0 20 20" width={size} height={size} className={cn(className)} fill="none">
            <path fill="currentColor" fillRule="evenodd" d="M10.14 3.001a.25.25 0 0 0-.28 0L4.5 6.631v8.12A2.25 2.25 0 0 0 6.75 17h6.5a2.25 2.25 0 0 0 2.25-2.25V6.63zm-7.47 4.87L3 7.648v7.102a3.75 3.75 0 0 0 3.75 3.75h6.5A3.75 3.75 0 0 0 17 14.75V7.648l.33.223a.75.75 0 0 0 .84-1.242l-7.189-4.87a1.75 1.75 0 0 0-1.962 0l-7.19 4.87a.75.75 0 1 0 .842 1.242m9.33 2.13a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1z" clipRule="evenodd"></path>
        </svg>
    );
};

export const HomeFillIcon = ({ size, className }: Props) => {
    return (
        <svg data-2hw="true" data-qa="home-filled" aria-hidden="true" viewBox="0 0 20 20" width={size} height={size} className={cn(className)} fill="none">
            <path fill="currentColor" fillRule="evenodd" d="m3 7.649-.33.223a.75.75 0 0 1-.84-1.244l7.191-4.852a1.75 1.75 0 0 1 1.958 0l7.19 4.852a.75.75 0 1 1-.838 1.244L17 7.649v7.011c0 2.071-1.679 3.84-3.75 3.84h-6.5C4.679 18.5 3 16.731 3 14.66zM11 11a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1z" clipRule="evenodd"></path>
        </svg>
    );
};

export const PrefixIcon = ({ size, className }: Props) => {
    return (
        <svg data-2hw="true" data-qa="sidebar-channel-icon-prefix" aria-hidden="true" viewBox="0 0 20 20" width={size} height={size} className={cn(className)} fill="none">
            <path fill="currentColor" fillRule="evenodd" d="M9.74 3.878a.75.75 0 1 0-1.48-.255L7.68 7H3.75a.75.75 0 0 0 0 1.5h3.67L6.472 14H2.75a.75.75 0 0 0 0 1.5h3.463l-.452 2.623a.75.75 0 0 0 1.478.255l.496-2.878h3.228l-.452 2.623a.75.75 0 0 0 1.478.255l.496-2.878h3.765a.75.75 0 0 0 0-1.5h-3.506l.948-5.5h3.558a.75.75 0 0 0 0-1.5h-3.3l.54-3.122a.75.75 0 0 0-1.48-.255L12.43 7H9.2zM11.221 14l.948-5.5H8.942L7.994 14z" clipRule="evenodd"></path>
        </svg>
    );
};

export const AiSparkleIcon = ({ size, className }: Props) => {
    return (
        <svg data-2hw="true" data-qa="ai-sparkle" aria-hidden="true" viewBox="0 0 20 20" width={size} height={size} className={cn(className)} fill="none">
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="m17.357 3.357 1.031.517a.2.2 0 0 1 0 .358l-1.03.517a1.6 1.6 0 0 0-.716.715l-.518 1.03a.2.2 0 0 1-.357 0l-.518-1.03a1.6 1.6 0 0 0-.715-.715l-1.031-.517a.2.2 0 0 1 0-.358l1.03-.517a1.6 1.6 0 0 0 .716-.715l.518-1.03a.2.2 0 0 1 .357 0l.518 1.03c.156.308.404.563.715.715m1.031 12.411-1.03-.517a1.6 1.6 0 0 1-.716-.715l-.518-1.03a.2.2 0 0 0-.357 0l-.518 1.03a1.6 1.6 0 0 1-.715.715l-1.031.517a.2.2 0 0 0 0 .358l1.03.517c.312.152.56.407.716.715l.518 1.03a.2.2 0 0 0 .357 0l.518-1.03a1.6 1.6 0 0 1 .715-.715l1.031-.517a.2.2 0 0 0 0-.358M10.736 8.33l1.56.778.017.009.275.137.007.003.546.273a.465.465 0 0 1 0 .832l-.546.273-.007.003-.275.137-.018.01-1.56.777a3.73 3.73 0 0 0-1.668 1.668l-.78 1.56-.008.017-.136.273-.004.007-.273.548a.465.465 0 0 1-.833 0l-.273-.548-.004-.007-.136-.273-.009-.017-.779-1.56a3.73 3.73 0 0 0-1.669-1.668l-1.56-.778-.017-.009-.275-.137-.007-.003-.546-.273a.465.465 0 0 1 0-.832l.546-.273.007-.003.275-.137.018-.01 1.56-.777a3.73 3.73 0 0 0 1.668-1.668l.78-1.56.008-.017.136-.273.004-.007.273-.547a.465.465 0 0 1 .833 0l.273.547.004.007.136.273.009.018.779 1.559a3.73 3.73 0 0 0 1.669 1.668m-.67 1.342.55.274-.55.274a5.23 5.23 0 0 0-2.34 2.34h-.001l-.275.551-.276-.551a5.23 5.23 0 0 0-2.34-2.34l-.55-.274.55-.274a5.23 5.23 0 0 0 2.34-2.339l.276-.552.275.551v.001a5.23 5.23 0 0 0 2.34 2.338"
                clipRule="evenodd"
            ></path>
        </svg>
    );
};

export const UserPlusIcon = ({ size, className }: Props) => {
    return (
        <svg data-2hw="true" data-qa="user-add" aria-hidden="true" viewBox="0 0 20 20" width={size} height={size} className={cn(className)} fill="none">
            <path fill="currentColor" fillRule="evenodd" d="M6 6.673c0-1.041.352-1.824.874-2.345C7.398 3.805 8.139 3.5 9 3.5c.86 0 1.602.305 2.126.828.522.521.874 1.304.874 2.345a3.9 3.9 0 0 1-1.05 2.646c-.629.678-1.38 1.014-1.95 1.014S7.679 9.997 7.05 9.32A3.9 3.9 0 0 1 6 6.673M9 2c-1.222 0-2.356.438-3.186 1.267C4.98 4.1 4.5 5.277 4.5 6.673a5.4 5.4 0 0 0 1.951 4.14 10 10 0 0 0-1.873.658c-1.464.693-2.811 1.828-3.448 3.557-.3.811-.067 1.59.423 2.132.475.526 1.193.84 1.947.84h8.75a.75.75 0 0 0 0-1.5H3.5c-.35 0-.657-.15-.834-.346-.163-.18-.212-.382-.129-.607.463-1.256 1.459-2.14 2.683-2.72C6.449 12.246 7.853 12 9 12c.907 0 1.981.154 3.004.51a.75.75 0 0 0 .494-1.416q-.473-.165-.95-.28.266-.221.502-.475a5.4 5.4 0 0 0 1.45-3.666c0-1.396-.481-2.574-1.314-3.406C11.356 2.438 10.223 2 9 2m6.5 9a.75.75 0 0 1 .75.75v2h2a.75.75 0 0 1 0 1.5h-2v2a.75.75 0 0 1-1.5 0v-2h-2a.75.75 0 0 1 0-1.5h2v-2a.75.75 0 0 1 .75-.75" clipRule="evenodd"></path>
        </svg>
    );
};

export const AaIcon = ({ size, className }: Props) => {
    return (
        <svg data-2hw="true" data-qa="formatting" aria-hidden="true" viewBox="0 0 20 20" width={size} height={size} className={cn(className)} fill="none">
            <path fill="currentColor" fillRule="evenodd" d="M6.941 3.952c-.459-1.378-2.414-1.363-2.853.022l-4.053 12.8a.75.75 0 0 0 1.43.452l1.101-3.476h6.06l1.163 3.487a.75.75 0 1 0 1.423-.474zm1.185 8.298L5.518 4.427 3.041 12.25zm6.198-5.537a4.74 4.74 0 0 1 3.037-.081A3.74 3.74 0 0 1 20 10.208V17a.75.75 0 0 1-1.5 0v-.745a8 8 0 0 1-2.847 1.355 3 3 0 0 1-3.15-1.143C10.848 14.192 12.473 11 15.287 11H18.5v-.792c0-.984-.641-1.853-1.581-2.143a3.24 3.24 0 0 0-2.077.056l-.242.089a2.22 2.22 0 0 0-1.34 1.382l-.048.145a.75.75 0 0 1-1.423-.474l.048-.145a3.72 3.72 0 0 1 2.244-2.315zM18.5 12.5h-3.213c-1.587 0-2.504 1.801-1.57 3.085.357.491.98.717 1.572.57a6.5 6.5 0 0 0 2.47-1.223l.741-.593z" clipRule="evenodd"></path>
        </svg>
    );
};

export const BoldIcon = ({ size, className }: Props) => {
    return (
        <svg data-2hw="true" data-qa="bold" aria-hidden="true" viewBox="0 0 20 20" width={size} height={size} className={cn(className)} fill="none">
            <path fill="currentColor" fillRule="evenodd" d="M4 2.75A.75.75 0 0 1 4.75 2h6.343a3.91 3.91 0 0 1 3.88 3.449A2 2 0 0 1 15 5.84l.001.067a3.9 3.9 0 0 1-1.551 3.118A4.627 4.627 0 0 1 11.875 18H4.75a.75.75 0 0 1-.75-.75V9.5a.8.8 0 0 1 .032-.218A.8.8 0 0 1 4 9.065zm2.5 5.565h3.593a2.157 2.157 0 1 0 0-4.315H6.5zm4.25 1.935H6.5v5.5h4.25a2.75 2.75 0 1 0 0-5.5" clipRule="evenodd"></path>
        </svg>
    );
};

export const ItalicIcon = ({ size, className }: Props) => {
    return (
        <svg data-2hw="true" data-qa="italic" aria-hidden="true" viewBox="0 0 20 20" width={size} height={size} className={cn(className)} fill="none">
            <path fill="currentColor" fillRule="evenodd" d="M7 2.75A.75.75 0 0 1 7.75 2h7.5a.75.75 0 0 1 0 1.5H12.3l-2.6 13h2.55a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5H7.7l2.6-13H7.75A.75.75 0 0 1 7 2.75" clipRule="evenodd"></path>
        </svg>
    );
};

export const UnderlineIcon = ({ size, className }: Props) => {
    return (
        <svg data-2hw="true" data-qa="strikethrough" aria-hidden="true" viewBox="0 0 20 20" width={size} height={size} className={cn(className)} fill="none">
            <path fill="currentColor" fillRule="evenodd" d="M11.721 3.84c-.91-.334-2.028-.36-3.035-.114-1.51.407-2.379 1.861-2.164 3.15C6.718 8.051 7.939 9.5 11.5 9.5l.027.001h5.723a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5h3.66c-.76-.649-1.216-1.468-1.368-2.377-.347-2.084 1.033-4.253 3.265-4.848l.007-.002.007-.002c1.252-.307 2.68-.292 3.915.16 1.252.457 2.337 1.381 2.738 2.874a.75.75 0 0 1-1.448.39c-.25-.925-.91-1.528-1.805-1.856m2.968 9.114a.75.75 0 1 0-1.378.59c.273.64.186 1.205-.13 1.674-.333.492-.958.925-1.82 1.137-.989.243-1.991.165-3.029-.124-.93-.26-1.613-.935-1.858-1.845a.75.75 0 0 0-1.448.39c.388 1.441 1.483 2.503 2.903 2.9 1.213.338 2.486.456 3.79.135 1.14-.28 2.12-.889 2.704-1.753.6-.888.743-1.992.266-3.104" clipRule="evenodd"></path>
        </svg>
    );
};

export const EmojiPlus = ({ size, className }: Props) => {
    return (
        <svg data-2hw="true" data-qa="add-reaction" aria-hidden="true" viewBox="0 0 20 20" width={size} height={size} className={cn(className)} fill="none">
            <path fill="currentColor" fillRule="evenodd" d="M15.5 1a.75.75 0 0 1 .75.75v2h2a.75.75 0 0 1 0 1.5h-2v2a.75.75 0 0 1-1.5 0v-2h-2a.75.75 0 0 1 0-1.5h2v-2A.75.75 0 0 1 15.5 1m-13 10a6.5 6.5 0 0 1 7.166-6.466.75.75 0 0 0 .152-1.493 8 8 0 1 0 7.14 7.139.75.75 0 0 0-1.492.152A7 7 0 0 1 15.5 11a6.5 6.5 0 1 1-13 0m4.25-.5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5m4.5 0a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5M9 15c1.277 0 2.553-.724 3.06-2.173.148-.426-.209-.827-.66-.827H6.6c-.452 0-.808.4-.66.827C6.448 14.276 7.724 15 9 15" clipRule="evenodd"></path>
        </svg>
    );
};

export const MessageIcon = ({ size, className }: Props) => {
    return (
        <svg data-2hw="true" data-qa="threads" aria-hidden="true" viewBox="0 0 20 20" width={size} height={size} className={cn(className)} fill="none">
            <path fill="currentColor" fillRule="evenodd" d="M10 3a7 7 0 1 0 3.394 13.124.75.75 0 0 1 .542-.074l2.794.68-.68-2.794a.75.75 0 0 1 .073-.542A7 7 0 0 0 10 3m-8.5 7a8.5 8.5 0 1 1 16.075 3.859l.904 3.714a.75.75 0 0 1-.906.906l-3.714-.904A8.5 8.5 0 0 1 1.5 10M6 8.25a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5A.75.75 0 0 1 6 8.25M6.75 11a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5z" clipRule="evenodd"></path>
        </svg>
    );
};

export const ShareIcon = ({ size, className }: Props) => {
    return (
        <svg data-2hw="true" data-qa="share-message" aria-hidden="true" viewBox="0 0 20 20" width={size} height={size} className={cn(className)} fill="none">
            <path fill="currentColor" fillRule="evenodd" d="M10.457 2.56a.75.75 0 0 1 .814.15l7 6.75a.75.75 0 0 1 0 1.08l-7 6.75A.75.75 0 0 1 10 16.75V13.5H6c-1.352 0-2.05.389-2.43.832-.4.465-.57 1.133-.57 1.918a.75.75 0 0 1-1.5 0V14c0-2.594.582-4.54 2-5.809C4.898 6.941 6.944 6.5 9.5 6.5h.5V3.25c0-.3.18-.573.457-.69M3.052 12.79C3.777 12.278 4.753 12 6 12h4.75a.75.75 0 0 1 .75.75v2.235L16.67 10 11.5 5.015V7.25a.75.75 0 0 1-.75.75H9.5c-2.444 0-4.023.434-5 1.309-.784.702-1.29 1.788-1.448 3.481" clipRule="evenodd"></path>
        </svg>
    );
};

export const BookMarkIcon = ({ size, className }: Props) => {
    return (
        <svg data-2hw="true" data-qa="bookmark" aria-hidden="true" viewBox="0 0 20 20" width={size} height={size} className={cn(className)} fill="none">
            <path fill="currentColor" fillRule="evenodd" d="M4.25 4.25A2.75 2.75 0 0 1 7 1.5h6a2.75 2.75 0 0 1 2.75 2.75v12.793c0 1.114-1.346 1.671-2.134.884L10 14.31l-3.616 3.616c-.788.787-2.134.23-2.134-.884zM7 3c-.69 0-1.25.56-1.25 1.25v12.19l3.649-3.65a.85.85 0 0 1 1.202 0l3.649 3.65V4.25C14.25 3.56 13.69 3 13 3z" clipRule="evenodd"></path>
        </svg>
    );
};

export const OptionIcon = ({ size, className }: Props) => {
    return (
        <svg data-2hw="true" data-qa="ellipsis-vertical-filled" aria-hidden="true" viewBox="0 0 20 20" width={size} height={size} className={cn(className)} fill="none">
            <path fill="currentColor" fillRule="evenodd" d="M10 5.5A1.75 1.75 0 1 1 10 2a1.75 1.75 0 0 1 0 3.5m0 6.25a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5m-1.75 4.5a1.75 1.75 0 1 0 3.5 0 1.75 1.75 0 0 0-3.5 0" clipRule="evenodd"></path>
        </svg>
    );
};
