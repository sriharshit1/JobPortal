import { useEffect, useState } from "react";
import {
  Button,
  Group,
  Text,
  FileInput,
  Card,
  LoadingOverlay,
  Modal,
  useMantineColorScheme,
  Divider,
} from "@mantine/core";
import {
  IconDownload,
  IconUpload,
  IconArrowUpRight,
} from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { getResume, updateResume } from "../Services/ResumeService";
import {
  successNotification,
  errorNotification,
} from "../Services/NotificationService";

const ResumePage = () => {
  const user = useSelector((state: any) => state.user);
  const [resume, setResume] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [showInput, setShowInput] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [previewReady, setPreviewReady] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const { colorScheme } = useMantineColorScheme();

  const fetchResume = async () => {
    try {
      const data = await getResume(user.id);
      setResume(`data:application/pdf;base64,${data.resume}`);
      setPreviewReady(true);
      setIframeKey((prev) => prev + 1);
    } catch (err: any) {
      errorNotification("Error", "Could not fetch resume.");
    }
  };

  useEffect(() => {
    if (user?.id) fetchResume();
  }, [user]);

  const handleUpload = async () => {
    if (!file) return;

    try {
      setUploading(true);
      const base64Full = await convertToBase64(file);
      const base64 = base64Full.split(",")[1]; // Only base64 content

      await updateResume({
        applicantId: user.id,
        resume: base64,
      });

      successNotification("Success", "Resume uploaded successfully!");
      setShowInput(false);
      setFile(null);

      setProcessing(true);
      setTimeout(() => {
        setResume(base64Full);
        setPreviewReady(true);
        setProcessing(false);
        setIframeKey((prev) => prev + 1);
      }, 1500);
    } catch (err: any) {
      errorNotification("Upload Failed", "Could not upload resume.");
    } finally {
      setUploading(false);
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  return (
    <>
      {/* Full-screen loader */}
      {(uploading || processing) && (
        <div style={{ position: "fixed", inset: 0, zIndex: 2000 }}>
          <LoadingOverlay
            visible
            overlayProps={{ radius: "sm", blur: 2 }}
            loaderProps={{ color: "bright-sun.4", type: "bars" }}
          />
        </div>
      )}

      {/* Full-screen resume preview modal */}
      <Modal
        opened={previewModalOpen}
        onClose={() => setPreviewModalOpen(false)}
        fullScreen
        padding={0}
        withCloseButton
        centered
        styles={{
          body: {
            backgroundColor: colorScheme === "dark" ? "#1A1B1E" : "#fff",
            padding: 0,
          },
        }}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        {resume && (
          <iframe
            key={iframeKey}
            src={`${resume}#toolbar=0&navpanes=0&scrollbar=0`}
            title="Resume"
            width="100%"
            height="100%"
            style={{
              border: "none",
              height: "calc(100vh - 60px)",
              display: "block",
              backgroundColor: colorScheme === "dark" ? "#1A1B1E" : "#fff",
            }}
          />
        )}

        <Group p="md" justify="space-between" style={{ borderTop: "1px solid #ccc" }}>
          <a href={resume || "#"} download="resume.pdf" target="_blank" rel="noreferrer">
            <Button color="bright-sun.4" variant="light" leftSection={<IconDownload size={14} />}>
              Download
            </Button>
          </a>
          <Button
            autoContrast
            leftSection={<IconArrowUpRight size={14} />}
            variant="outline"
            color="bright-sun.4"
            onClick={() => {
              setShowInput(true);
              setPreviewModalOpen(false);
            }}
          >
            Update Resume
          </Button>
        </Group>
      </Modal>

      <Card shadow="md" radius="md" padding="lg" pos="relative">
        <div className="text-mine-shaft-200 text-center font-semibold">
          <Text size="xl">Resume</Text>
        </div>

        <Divider size="xs" mx="md" />

        {!resume && !previewReady && (
          <>
            <div className="text-mine-shaft-400 p-5 text-center">
              <Text>No resume uploaded yet.</Text>
            </div>
            <Divider size="xs" mx="md" />
            <div className="w-70% p-10 text-center">
              <Button
                autoContrast
                leftSection={<IconUpload size={14} />}
                mt="sm"
                onClick={() => setShowInput(true)}
              >
                Upload Resume
              </Button>
            </div>
          </>
        )}

        {showInput && (
          <>
            <FileInput
              label="Choose Resume"
              placeholder="Select PDF"
              accept=".pdf"
              value={file}
              onChange={setFile}
              mt="md"
            />
            <Group mt="sm">
              <Button
                autoContrast
                onClick={handleUpload}
                leftSection={<IconUpload size={14} />}
                disabled={!file}
                loading={uploading}
              >
                Submit
              </Button>
              <Button
                color="bright-sun.4"
                variant="outline"
                onClick={() => {
                  setFile(null);
                  setShowInput(false);
                }}
              >
                Cancel
              </Button>
            </Group>
          </>
        )}

        {previewReady && (
            <div className="w-70% p-10 text-center">
          <Button mt="md" autoContrast onClick={() => setPreviewModalOpen(true)}>
            Preview Resume
          </Button>
          </div>
        )}
      </Card>
    </>
  );
};

export default ResumePage;
