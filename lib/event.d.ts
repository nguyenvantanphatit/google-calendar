export interface Event {
    id: string;
    title: string;
    start: string;
    end?: string;
    url?: string;
    desc?: string;
    type: string;
    classNames?: string[];
    rrule?: {
      freq: string;
      interval: number;
      byweekday: string[];
      dtstart: string;
      until: string;
    };
  }
  