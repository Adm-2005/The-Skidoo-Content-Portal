let sections = [];
let globalMedia = [];

function createInput(name, placeholder) {
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = placeholder;
  input.className = "w-full p-2 border rounded-lg";
  input.name = name;
  input.dataset.name = name;
  return input;
}

function createTextarea(name, placeholder) {
  const textarea = document.createElement("textarea");
  textarea.placeholder = placeholder;
  textarea.className = "w-full p-2 border rounded-lg";
  textarea.name = name;
  textarea.dataset.name = name;
  return textarea;
}

function addSection() {
  const container = document.getElementById("sectionsContainer");
  const sectionIndex = sections.length;
  const sectionDiv = document.createElement("div");
  sectionDiv.className = "border p-4 rounded-lg bg-gray-50 space-y-4";

  const nameInput = createInput(`sections[${sectionIndex}].name`, "Section Name");
  nameInput.addEventListener("input", (e) => {
    sections[sectionIndex].name = e.target.value;
  });
  sectionDiv.appendChild(nameInput);

  const textArea = createTextarea(`sections[${sectionIndex}].text`, "Section Text");
  textArea.addEventListener("input", (e) => {
    sections[sectionIndex].text = e.target.value;
  });
  sectionDiv.appendChild(textArea);

  const addSubsectionBtn = document.createElement("button");
  addSubsectionBtn.type = "button";
  addSubsectionBtn.textContent = "Add Subsection";
  addSubsectionBtn.className = "bg-blue-500 text-white px-4 py-2 rounded";
  addSubsectionBtn.onclick = () => addSubsection(sectionIndex);
  sectionDiv.appendChild(addSubsectionBtn);

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.textContent = "Remove Section";
  removeBtn.className = "bg-red-500 text-white px-4 py-2 rounded";
  removeBtn.onclick = () => {
    sections.splice(sectionIndex, 1);
    sectionDiv.remove();
  };
  sectionDiv.appendChild(removeBtn);

  sections.push({
    name: "",
    text: "",
    subsections: []
  });

  container.appendChild(sectionDiv);
}


function addSubsection(sectionIndex) {
  const section = sections[sectionIndex];
  const subsectionIndex = section.subsections.length;

  const sectionDiv = document.getElementById("sectionsContainer").children[sectionIndex];
  const subsectionsDiv = document.createElement("div");
  subsectionsDiv.className = "border p-4 rounded-lg bg-gray-100 space-y-2";

  const nameInput = createInput(`sections[${sectionIndex}].subsections[${subsectionIndex}].name`, "Subsection Name");
  nameInput.addEventListener("input", (e) => {
    section.subsections[subsectionIndex].name = e.target.value;
  });
  subsectionsDiv.appendChild(nameInput);

  const textArea = createTextarea(`sections[${sectionIndex}].subsections[${subsectionIndex}].text`, "Subsection Text");
  textArea.addEventListener("input", (e) => {
    section.subsections[subsectionIndex].text = e.target.value;
  });
  subsectionsDiv.appendChild(textArea);

  const mediaTypeInput = createInput(`sections[${sectionIndex}].subsections[${subsectionIndex}].media.type`, "Media Type");
  mediaTypeInput.addEventListener("input", (e) => {
    section.subsections[subsectionIndex].media.type = e.target.value;
  });
  subsectionsDiv.appendChild(mediaTypeInput);

  const mediaLinkInput = createInput(`sections[${sectionIndex}].subsections[${subsectionIndex}].media.link`, "Media Link");
  mediaLinkInput.addEventListener("input", (e) => {
    section.subsections[subsectionIndex].media.link = e.target.value;
  });
  subsectionsDiv.appendChild(mediaLinkInput);

  const removeSubsectionBtn = document.createElement("button");
  removeSubsectionBtn.type = "button";
  removeSubsectionBtn.textContent = "Remove Subsection";
  removeSubsectionBtn.className = "bg-red-500 text-white px-4 py-2 rounded";
  removeSubsectionBtn.onclick = () => {
    section.subsections.splice(subsectionIndex, 1);
    subsectionsDiv.remove();
  };
  subsectionsDiv.appendChild(removeSubsectionBtn);

  sectionDiv.appendChild(subsectionsDiv);
  section.subsections.push({ name: "", text: "", media: { type: "", link: "" } });
}

function addMedia() {
  const container = document.getElementById("mediaContainer");
  const mediaDiv = document.createElement("div");
  mediaDiv.className = "border p-4 rounded-lg bg-gray-50 space-y-2";

  const mediaTypeInput = createInput("media.type", "Media Type");
  mediaTypeInput.dataset.name = "media.type";
  mediaDiv.appendChild(mediaTypeInput);

  const mediaLinkInput = createInput("media.link", "Media Link");
  mediaLinkInput.dataset.name = "media.link";
  mediaDiv.appendChild(mediaLinkInput);

  const removeMediaBtn = document.createElement("button");
  removeMediaBtn.type = "button";
  removeMediaBtn.textContent = "Remove Media";
  removeMediaBtn.className = "bg-red-500 text-white px-4 py-2 rounded";
  removeMediaBtn.onclick = () => mediaDiv.remove();
  mediaDiv.appendChild(removeMediaBtn);

  container.appendChild(mediaDiv);
}

async function submitForm(event) {
  event.preventDefault();

  const titleElement = document.querySelector('[name="title"]');
  const slugElement = document.querySelector('[name="slug"]');
  const categoryElement = document.querySelector('[name="category"]');
  const locationElement = document.querySelector('[name="location"]');
  const keywordsElement = document.querySelector('[name="keywords"]');
  const metaTitleElement = document.querySelector('[name="metaTitle"]');
  const metaDescriptionElement = document.querySelector('[name="metaDescription"]');

  const formData = {
    id: null,
    title: titleElement ? titleElement.value : "",
    slug: slugElement ? slugElement.value : "",
    category: categoryElement ? categoryElement.value : "",
    location: locationElement ? locationElement.value : "",
    keywords: keywordsElement ? keywordsElement.value.split(",").map((k) => k.trim()) : [],
    meta: {
      title: metaTitleElement ? metaTitleElement.value : "",
      description: metaDescriptionElement ? metaDescriptionElement.value : "",
    },
    sections,
    media: Array.from(document.querySelectorAll("#mediaContainer .border"))
      .map((mediaDiv) => {
        const typeInput = mediaDiv.querySelector('[data-name="media.type"]');
        const linkInput = mediaDiv.querySelector('[data-name="media.link"]');
        
        const type = typeInput ? typeInput.value : "";
        const link = linkInput ? linkInput.value : "";
        
        return (type && link) ? { type, link } : null;
      })
      .filter(media => media !== null),
    created_at: null,
    updated_at: null,
  };

  const response = await fetch("/create-post", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    alert("Data submitted successfully!");
  } else {
    alert("Error submitting data.");
  }
}
