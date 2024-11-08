import { FooterNavbar } from "../../components/footer-navbar";

export const Task = () => {
  return (
    <section className="h-screen w-full">
      <div>
        <div className="spinBtn"></div>
        <div className="wheel">
          <div className="number">
            <span>100</span>
          </div>
        </div>
      </div>

      <footer>
        <FooterNavbar />
      </footer>
    </section>
  );
};
