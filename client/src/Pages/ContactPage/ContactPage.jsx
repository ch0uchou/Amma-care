import PageHeading from '../../Components/PageHeading';
import ContactSection from '../../Components/ContactSection';
import Section from '../../Components/Section';
import LocationMap from '../../Components/LocationMap/Index';

const headingData = {
  backgroundImage: '/assets/img/page_heading_bg.jpg',
  title: 'Liên Hệ',
};

const contactData = {
  // sectionSubtitle: 'LIÊN HỆ VỚI CHÚNG TÔI',
  SectionTitle: 'LIÊN HỆ VỚI CHÚNG TÔI',
  teethShapeImg: 'assets/img/icons/hero_shape_3.png',
  contactImg: 'assets/img/contact_2.jpg',
  iconBox: {
    style: 'cs_style_4',
    icon: 'assets/img/icons/call_icon_1.png',
    title: 'Cuộc gọi khẩn cấp  0905 560 643',
    subtitle: 'Hỗ trợ 24/7 – Tận tâm và nhanh chóng',
  },
};

const mapData = {
  mapSrc:
    'https://www.google.com/maps/embed/v1/place?key=AIzaSyAzafa8o-9TvpQ3w9oLfxvUieUZ3aOWOQs&q=Da+Nang+University+of+Science+and+Technology',
};
const ContactPage = () => {
  return (
    <>
      <Section
        topSpaceMd="100"
      >
      </Section>

      <Section
        className={'cs_page_heading cs_bg_filed cs_center'}
        backgroundImage="/assets/img/banner-doctors.png"
      >
        <PageHeading data={headingData} />
      </Section>

      <Section
        topSpaceLg="70"
        topSpaceMd="110"
        bottomSpaceLg="80"
        bottomSpaceMd="120"
      >
        <ContactSection reverseOrder={true} data={contactData} />
      </Section>

      <Section bottomSpaceLg="0" bottomSpaceMd="0">
        <LocationMap mapSrc={mapData.mapSrc} />
      </Section>
    </>
  );
};

export default ContactPage;
