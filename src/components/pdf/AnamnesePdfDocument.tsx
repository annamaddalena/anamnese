import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import type { ReviewSection } from "@/lib/review-summary";

const colors = {
  forest: "#192715",
  brown: "#4C3926",
  cream: "#F2E2CB",
};

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: colors.brown,
    lineHeight: 1.45,
  },
  title: {
    fontSize: 20,
    color: colors.forest,
    marginBottom: 4,
    fontFamily: "Helvetica-Bold",
  },
  subtitle: {
    fontSize: 10,
    color: colors.brown,
    marginBottom: 20,
  },
  contactBox: {
    backgroundColor: colors.cream,
    padding: 12,
    borderRadius: 6,
    marginBottom: 20,
  },
  contactLine: {
    marginBottom: 3,
  },
  sectionTitle: {
    fontSize: 13,
    color: colors.forest,
    fontFamily: "Helvetica-Bold",
    marginTop: 14,
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.cream,
  },
  behaviorTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: colors.forest,
    marginTop: 8,
    marginBottom: 4,
  },
  rowLabel: {
    fontFamily: "Helvetica-Bold",
    marginTop: 6,
  },
  rowValue: {
    marginTop: 2,
  },
});

export type AnamnesePdfProps = {
  generatedAt: string;
  contact: {
    vorname: string;
    nachname: string;
    email: string;
    telefon: string;
    hundName: string;
  };
  sections: ReviewSection[];
};

export function AnamnesePdfDocument({
  generatedAt,
  contact,
  sections,
}: AnamnesePdfProps) {
  const nameLine = [contact.vorname, contact.nachname].filter(Boolean).join(" ");
  const hundLine = contact.hundName || "—";

  return (
    <Document title="Anamnese Fragebogen">
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Anamnese Fragebogen</Text>
        <Text style={styles.subtitle}>Erstellt am {generatedAt}</Text>

        <View style={styles.contactBox}>
          {nameLine ? (
            <Text style={styles.contactLine}>{nameLine}</Text>
          ) : null}
          {contact.email ? (
            <Text style={styles.contactLine}>{contact.email}</Text>
          ) : null}
          {contact.telefon ? (
            <Text style={styles.contactLine}>{contact.telefon}</Text>
          ) : null}
          <Text style={styles.contactLine}>Hund: {hundLine}</Text>
        </View>

        {sections.map((section) => (
          <View key={section.slug}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.rows.map((row) => (
              <View key={row.id}>
                <Text style={styles.rowLabel}>{row.label}</Text>
                <Text style={styles.rowValue}>{row.value}</Text>
              </View>
            ))}
            {section.behaviorBlocks.map((block) => (
              <View key={block.title}>
                <Text style={styles.behaviorTitle}>{block.title}</Text>
                {block.rows.map((row) => (
                  <View key={`${block.title}-${row.label}`}>
                    <Text style={styles.rowLabel}>{row.label}</Text>
                    <Text style={styles.rowValue}>{row.value}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        ))}
      </Page>
    </Document>
  );
}
