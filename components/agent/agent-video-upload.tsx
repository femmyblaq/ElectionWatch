
"use client";

import { useEffect, useRef, useState } from "react";
import {
  Video,
  UploadCloud,
  X,
  Play,
  CheckCircle2,
  AlertCircle,
  Loader2,
  FileVideo,
} from "lucide-react";

import { submitAgentVideo } from "@/hooks/lib/api/agent-media";

const MAX_FILE_SIZE = 100 * 1024 * 1024;

const ALLOWED_TYPES = [
  "video/mp4",
  "video/quicktime",
  "video/webm",
];

export default function AgentVideoUpload() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!file) {
      setPreviewUrl("");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  function selectFile(selectedFile?: File) {
    setError("");
    setSuccess("");

    if (!selectedFile) return;

    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      setError("Choose an MP4, MOV or WebM video.");
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("Your video must not exceed 100 MB.");
      return;
    }

    setFile(selectedFile);
  }

  function removeFile() {
    setFile(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!file) {
      setError("Please select a video before submitting.");
      return;
    }

    if (!description.trim()) {
      setError("Please provide a description of your video.");
      return;
    }

    try {
      setLoading(true);

      const result = await submitAgentVideo({
        file,
        description: description.trim(),
      });

      setSuccess(result.message);
      setDescription("");
      removeFile();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Video submission failed."
      );
    } finally {
      setLoading(false);
    }
  }

  function formatFileSize(size: number) {
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  }

  return (
    <section
      id="video-evidence"
      className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
    >
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
            <Video size={23} />
          </div>

          <div>
            <h2 className="font-semibold text-slate-900">
              Submit video evidence
            </h2>
            <p className="mt-1 max-w-xl text-sm leading-6 text-slate-500">
              Upload relevant video evidence from your assigned
              polling unit for review by the authorized election
              monitoring team.
            </p>
          </div>
        </div>

        <span className="w-fit rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
          Video submissions
        </span>
      </div>

      <form onSubmit={handleSubmit} className="mt-7 space-y-5">
        {/* File selection */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Video file
          </label>

          {!file ? (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-5 py-10 text-center transition hover:border-blue-400 hover:bg-blue-50/40"
            >
              <div className="rounded-full bg-white p-4 text-blue-700 shadow-sm">
                <UploadCloud size={26} />
              </div>

              <p className="mt-4 text-sm font-semibold text-slate-800">
                Click to upload your video
              </p>

              <p className="mt-2 text-xs text-slate-500">
                MP4, MOV or WebM · Maximum 100 MB
              </p>
            </button>
          ) : (
            <div className="overflow-hidden rounded-xl border border-slate-200">
              {previewUrl && (
                <video
                  src={previewUrl}
                  controls
                  preload="metadata"
                  className="max-h-80 w-full bg-black"
                />
              )}

              <div className="flex items-center justify-between gap-3 p-4">
                <div className="flex min-w-0 items-center gap-3">
                  <FileVideo
                    size={22}
                    className="shrink-0 text-blue-700"
                  />

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      {file.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={removeFile}
                  aria-label="Remove selected video"
                  className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          )}

          <input
            ref={inputRef}
            type="file"
            accept="video/mp4,video/quicktime,video/webm"
            className="hidden"
            onChange={(event) =>
              selectFile(event.target.files?.[0])
            }
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="video-description"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Evidence description
          </label>

          <textarea
            id="video-description"
            rows={4}
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
            placeholder="Describe what the video captures, including the relevant polling unit and circumstances..."
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Messages */}
        {error && (
          <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            <AlertCircle size={17} className="mt-0.5 shrink-0" />
            {error}
          </div>
        )}

        {success && (
          <div className="flex items-start gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
            <CheckCircle2 size={17} className="mt-0.5 shrink-0" />
            {success}
          </div>
        )}

        <div className="flex flex-col justify-between gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center">
          <p className="text-xs leading-5 text-slate-400">
            Only submit relevant evidence. Avoid exposing voters'
            private information without authorization.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 size={17} className="animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Play size={16} />
                Submit video
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}
