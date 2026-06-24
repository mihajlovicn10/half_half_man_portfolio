const m=await import('/sessions/loving-sweet-sagan/mnt/outputs/i18naudit/en.mjs'); const en=(m.default??m).translation;
const g=(o,p)=>p.split('.').reduce((a,k)=>a&&a[k],o);
console.log('=== SLIDER (homepage hero) ===');
console.log(JSON.stringify(en.slider,null,1));
console.log('\n=== SERVICES (titles + descriptions) ===');
for(const k of Object.keys(en.services||{})){const v=en.services[k];if(v&&v.title)console.log(`- ${k}: "${v.title}" — ${String(v.description||'').slice(0,90)}`);else console.log(`- ${k}: ${JSON.stringify(v).slice(0,80)}`);}
console.log('\n=== PROJECT ITEMS (titles + summaries) ===');
for(const k of Object.keys(en.projects?.items||{})){const v=en.projects.items[k];console.log(`- ${k}: "${v.title||''}" — ${String(v.summary||'').slice(0,90)}`);}
console.log('\n=== ABOUT blocks ===');
console.log('title:',en.about?.title,'| subtitle:',en.about?.subtitle);
for(const k of Object.keys(en.about?.blocks||{})){const v=en.about.blocks[k];console.log(`- ${k}: "${v.title}" — ${String(v.description||'').slice(0,80)}`);}
