export default function LiveTVLayout({ children }) {
  return (
    <section className="bg-neutral-900 min-h-screen">
      {/* You can add a specific sub-navbar or header for the /live section here if needed */}
      {/* For now, it will inherit the main navbar */}
      <main>{children}</main>
      {/* You can add a specific footer for the /live section here if needed */}
    </section>
  );
}