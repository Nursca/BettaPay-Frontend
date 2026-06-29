Fix KPI card grid for very small screens
Repo Avatar
Betta-Pay/BettaPay-Frontend
Description: The dashboard KPI stat cards use grid gap-4 sm:grid-cols-2 lg:grid-cols-4. On screens between 320px and 640px (single column), all four cards stack vertically. This is functionally correct, but each card takes significant vertical space, pushing the chart far down the page.

Requirements:

On single-column mobile, make KPI cards more compact (smaller padding, smaller font)
Consider a 2-column variant for screens between 400px and 640px
Reduce the "Total Volume (30d)" text size and the currency display size on small screens
Suggested execution steps:

In app/(merchant)/dashboard/page.tsx, update the grid: grid gap-3 grid-cols-2 lg:grid-cols-4 (always 2 columns until large)
Reduce card padding on mobile with responsive classes on CardContent
Reduce the stat number from text-2xl to text-xl sm:text-2xl
Apply similar adjustments to settlement page stat cards
Apply to admin overview stat cards