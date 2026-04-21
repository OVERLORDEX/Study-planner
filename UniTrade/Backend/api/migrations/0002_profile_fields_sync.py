from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='bio',
            field=models.TextField(blank=True, default=''),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='profile',
            name='telegram_username',
            field=models.CharField(max_length=100, blank=True, default=''),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='profile',
            name='university_id',
            field=models.CharField(max_length=50, blank=True, default=''),
            preserve_default=False,
        ),
    ]