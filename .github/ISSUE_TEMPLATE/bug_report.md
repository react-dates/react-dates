---
name: Bug report
about: Create a report to help us improve
title: ''
labels: ''
assignees: ''

---

**react-dates version**
e.g. react-dates@18.3.1

**Describe the bug**
A clear and concise description of what the bug is.

**Source code (including props configuration)**
Steps to reproduce the behavior:
```
<DateRangePicker
  startDate={this.state.startDate}
  startDateId="your_unique_start_date_id"
  endDate={this.state.endDate}
  endDateId="your_unique_end_date_id"
  onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
  focusedInput={this.state.focusedInput}
  onFocusChange={focusedInput => this.setState({ focusedInput })}
/>
```
If you have custom methods that you are passing into a `react-dates` component, e.g. `onDatesChange`, `onFocusChange`, `renderMonth`, `isDayBlocked`, etc., please include the source for those as well.

**Screenshots/Gifs**
If applicable, add screenshots or gifs to help explain your problem.

**Desktop (please complete the following information):**
 - OS: [e.g. iOS]
 - Browser [e.g. chrome, safari]
 - Version [e.g. 22]

**Smartphone (please complete the following information):**
 - Device: [e.g. iPhone6]
 - OS: [e.g. iOS8.1]
 - Browser [e.g. stock browser, safari]
 - Version [e.g. 22]

**Is the issue reproducible in Storybook?**
Please link to the relevant storybook example

**Additional context**
Add any other context about the problem here.
