import { Injectable } from '@nestjs/common';
import { SKILLS } from './skills.dictionary';

@Injectable()
export class SkillsService {
  extractSkills(text: string): string[] {
    const lower = text.toLowerCase();

    return SKILLS.filter((skill) => lower.includes(skill.toLowerCase()));
  }
}
