interface Developer {
    name: string;
    skills: string[];
    yearsOfExperience: number;
}

const me: Developer = {
    name: "Alee Anwar",
    skills: ["JavaScript", "TypeScript", "Node.js", "React"],
    yearsOfExperience: 5,
}

function introduce(dev: Developer): string {
    return `Hi, my name is ${dev.name}. I have ${dev.yearsOfExperience} years of experience in software development. My skills include ${dev.skills.join(", ")}.`;
}

console.log(introduce(me));