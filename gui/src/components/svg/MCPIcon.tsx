/**
 * MCP (Model Context Protocol) Official Logo Icon
 * Official clip-style logo from Anthropic
 */

interface MCPIconProps {
  className?: string;
}

export const MCPIcon = ({ className }: MCPIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.578}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M2.58 11.15L11.50 2.22C12.74 0.99 14.73 0.99 15.97 2.22V2.22C17.20 3.45 17.20 5.45 15.97 6.68L9.23 13.42" />
    <path d="M9.32 13.33L15.97 6.68C17.20 5.45 19.20 5.45 20.43 6.68L20.48 6.73C21.71 7.96 21.71 9.96 20.48 11.19L12.40 19.27C11.99 19.68 11.99 20.34 12.40 20.75L14.06 22.41" />
    <path d="M13.74 4.45L7.13 11.05C5.90 12.29 5.90 14.28 7.13 15.52V15.52C8.37 16.75 10.36 16.75 11.60 15.52L18.20 8.92" />
  </svg>
);
