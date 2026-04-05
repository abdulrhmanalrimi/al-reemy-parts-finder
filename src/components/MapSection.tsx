import { MapPin } from "lucide-react";

const MapSection = () => (
  <section id="location" className="py-16">
    <div className="container">
      <h2 className="mb-2 text-center text-3xl font-black text-foreground">موقعنا</h2>
      <p className="mb-8 flex items-center justify-center gap-2 text-center text-muted-foreground">
        <MapPin className="h-4 w-4 text-primary" />
        الحديدة – شارع اروى – بجوار الريمي لزجاج السيارات
      </p>
      <div className="overflow-hidden rounded-2xl shadow-lg">
        <iframe
          title="موقع مستودع الريمي"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3837.5!2d42.95!3d14.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDQ4JzAwLjAiTiA0MsKwNTcnMDAuMCJF!5e0!3m2!1sar!2s!4v1"
          width="100%"
          height="350"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  </section>
);

export default MapSection;
